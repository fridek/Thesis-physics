#!/usr/bin/perl

use strict;

$\ = "";

my $timejs = `cat /tmp/spheres2jstime.txt | grep real | sed 's/[ms]/ /g' | awk '{print \$3}'`;
my $timeem = `cat /tmp/spheres2emtime.txt | grep real | sed 's/[ms]/ /g' | awk '{print \$3}'`;
my $timecpp = `cat /tmp/spheres2cpptime.txt | grep real | sed 's/[ms]/ /g' | awk '{print \$3}'`;

my $jsfastest = 0;
my $emfastest = 0;
my $cppfastest = 0;
my $besttime = 0;

if ($timejs < $timeem && $timejs < $timecpp) {
    $jsfastest = 1;
    $besttime = $timejs;
}
if ($timeem < $timejs && $timeem < $timecpp) {
    $emfastest = 1;
    $besttime = $timeem;
}
if ($timecpp < $timeem && $timecpp < $timeem) {
    $cppfastest = 1;
    $besttime = $timecpp;
}

printf("%s %.2fs ", "JavaScript time:", $timejs);
if ($jsfastest) {
    printf("%s", "\e[00;32m[FASTEST]\e[00m");
} else {
    printf("%s", "\e[00;31m");
    printf("%.2f", ($timejs / $besttime - 1) * 100);
    printf("%s", "% slower");
    printf("%s", "\e[00m");
}
print "\n";

printf("%s %.2fs ", "Emscripten JavaScript time:", $timeem);
if ($emfastest) {
    printf("%s", "\e[00;32m[FASTEST]\e[00m");
} else {
    printf("%s", "\e[00;31m");
    printf("%.2f", ($timeem / $besttime - 1) * 100);
    printf("%s", "% slower");
    printf("%s", "\e[00m");
}
print "\n";

printf("%s %.2fs ", "C++ time:", $timecpp);
if ($cppfastest) {
    printf("%s", "\e[00;32m[FASTEST]\e[00m");
} else {
    printf("%s", "\e[00;31m");
    printf("%.2f", ($timecpp / $besttime - 1) * 100);
    printf("%s", "% slower");
    printf("%s", "\e[00m");
}
print "\n";
