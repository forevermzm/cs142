module Enumerable

    def each_group_by_first_letter
        letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

        letters.each {|letter|
            words = []
            self.each {|word|
                if word.index(letter) == 0 then words.insert(0, word)
                end
            }
            if words.size > 0 then yield(letter, words)
            end
        }
    end

end

x = ["abcd", "axyz", "able", "xyzab", "qrst"]

x.each_group_by_first_letter do |letter, words|
    printf("%s: %s\n", letter, words.join(" "))
end