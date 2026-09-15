#!/usr/bin/env bash
# Verify downloaded MCCB source worlds against SHA256SUMS.txt.
#
#   ./tools/verify.sh            # files next to SHA256SUMS.txt
#   ./tools/verify.sh ./dl       # files in another folder
#
# Exits 0 only if all six files are present and match.

set -u

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
sums="$repo_root/SHA256SUMS.txt"
target="${1:-$repo_root}"

if [ ! -f "$sums" ]; then
    echo "SHA256SUMS.txt not found at $sums" >&2
    exit 2
fi

if command -v sha256sum >/dev/null 2>&1; then
    hash_of() { sha256sum "$1" | cut -d' ' -f1; }
elif command -v shasum >/dev/null 2>&1; then
    hash_of() { shasum -a 256 "$1" | cut -d' ' -f1; }
else
    echo "Neither sha256sum nor shasum is available." >&2
    exit 2
fi

failed=0
checked=0

while IFS= read -r line; do
    line="${line%$'\r'}"              # tolerate a CRLF checkout
    case "$line" in ''|\#*) continue ;; esac

    expected="${line%% *}"
    name="${line#* }"
    name="${name#"${name%%[! ]*}"}"   # strip leading spaces
    name="${name#\*}"                 # strip binary marker

    checked=$((checked + 1))
    file="$target/$name"

    if [ ! -f "$file" ]; then
        echo "$name : MISSING"
        failed=$((failed + 1))
        continue
    fi

    actual="$(hash_of "$file")"
    if [ "$actual" = "$expected" ]; then
        echo "$name : OK"
    else
        echo "$name : FAILED"
        echo "    expected $expected"
        echo "    actual   $actual"
        failed=$((failed + 1))
    fi
done < "$sums"

echo
if [ "$failed" -eq 0 ] && [ "$checked" -gt 0 ]; then
    echo "$checked/$checked files verified."
    exit 0
fi

echo "$failed of $checked file(s) did not verify."
exit 1
