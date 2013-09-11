#!/bin/sh
shift  # get rid of the '-c' supplied by make.
echo "Measuring particles 1 time in JavaScript"
{ time sh -c "browser/static/d8 browser/static/particles1.js"; } 2> /tmp/particles1jstime.txt
echo "Measuring particles 1 time in EmScripten JavaScript"
{ time sh -c "browser/static/d8 emscripten/particles1.js"; } 2> /tmp/particles1emtime.txt
echo "Measuring particles 1 time in C++"
{ time sh -c "runtime/static/particles1"; } 2> /tmp/particles1cpptime.txt
time/particles1.pl
