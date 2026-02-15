#!/bin/bash

# Create build.gradle file with correct Java version configuration
cat > android/app/build.gradle << 'EOF'
plugins {
    id 'com.android.application'
}

android {
    namespace "com.example.ailake"
    compileSdk 34

    defaultConfig {
        applicationId "com.example.ailake"
        minSdk 21
        targetSdk 34
        versionCode 1
        versionName "1.0"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'androidx.appcompat:appcompat:1.7.1'
    implementation 'com.google.android.material:material:1.9.0'
}
EOF

echo "Created build.gradle file with correct Java version configuration"