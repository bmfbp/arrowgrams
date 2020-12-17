#!/bin/bash
cd ~/quicklisp/local-projects
rm -rf ~/.cache/common-lisp
rm -f */*.fasl
rm -f */*/*.fasl
rm -f */*/*/*.fasl
rm -f */*/*/*/*.fasl
rm -f */*~
rm -f */*/*~
rm -f */*/*/*~
rm -f */*/*/*/*~

