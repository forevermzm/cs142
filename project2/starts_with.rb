def each_starts_with(stringList, prefix)
    stringList.each { |str|
        if str.index(prefix) == 0
            yield(str)
        end
    }
end

array1 = ["about", "abolition", "duration", "combo", "abdicate"]
str1 = "ab"
each_starts_with(array1, str1) {|s| puts s}

array2 = ["100", "200", "132", "15764", "86851", "18762", "29781", "7653"]
str2 = "1"
each_starts_with(array2, str2) {|s| puts s.length}

array3 = ["preamble", "priest", "predicate", "proctor", "prude"]
str3 = "pre"
concat = ""
each_starts_with(array3, str3) {|s| concat = concat + s + ", "}
puts concat