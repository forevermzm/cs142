def filter(nums, options={})
    scaleFactor = 1

    if options.has_key? :"min"
        minNum = options[:"min"]
    end
    if options.has_key? :"max"
        maxNum = options[:"max"]
    end
    if options.has_key? :"odd"
        oddBool = options[:"odd"]
    end
    if options.has_key? :"even"
        evenBool = options[:"even"]
    end
    if options.has_key? :"scale"
        scaleFactor = options[:"scale"]
    end

    nums.each {|n|
        if minNum and n < minNum then next
        elsif maxNum and n > maxNum then next
        elsif oddBool and n % 2 != oddBool then next
        elsif evenBool and n % 2 == evenBool then next
        else yield(scaleFactor * n)
        end
    }

end

nums = [6, -5, 319, 400, 18, 94, 11]
filter(nums, :min => 10, :max => 350, :odd => 1, :scale => 2) {|n| puts n}
puts "\n"
filter(nums){|n| puts n}