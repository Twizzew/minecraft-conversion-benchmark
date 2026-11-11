FROM ubuntu:24.04 AS build
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends build-essential cmake ninja-build git python3 ca-certificates curl && rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/kbinani/je2be-core /src && cd /src && git checkout 8dfc4de1ba5c7f72e804abea8663380c0dbd5680
WORKDIR /src
RUN cmake -S . -B build -G Ninja -DCMAKE_BUILD_TYPE=Release -DCMAKE_CXX_STANDARD_LIBRARIES=/src/build/_deps/zlib-build/libz.a
RUN cmake --build build --target j2b b2j -j 2
RUN mkdir /out && cp $(find build -type f -name j2b -perm -u+x | head -1) $(find build -type f -name b2j -perm -u+x | head -1) /out/ && sha256sum /out/*
FROM ubuntu:24.04
COPY --from=build /out/ /usr/local/bin/
