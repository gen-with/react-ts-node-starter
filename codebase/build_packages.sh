#!/bin/bash

# List of packages to be built
packages=(
  "turbo@1.7.4"
  "ejs@2.7.4"
  "sqlite3@5.1.7"
  "esbuild@0.21.5"
  "core-js@3.37.1"
  "forward-edge@latest"
)

# Function to build a package
build_package() {
  package=$1
  echo "Building package: $package"
  yarn add $package
  if [ $? -ne 0 ]; then
    echo "Failed to build package: $package"
    exit 1
  fi
  echo "Successfully built package: $package"
}

# Iterate over each package and build it
for package in "${packages[@]}"; do
  build_package $package
done

echo "All packages built successfully"
