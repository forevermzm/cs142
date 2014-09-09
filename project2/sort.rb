def funny_sort(stringList)
    result = []
    for str in stringList do
        yield(str, result)
    end
    puts result
end

def getNumber(str)
    number = str.scan(/\d+/)
    if number.size().eql?(0)
        number = -1
    else
        number = number[0]
    end
    return number
end

# stringList = ["Hello123", "Wo3544rld232", "No number"]
stringList = ["No number", "Hello-12334", "Wo3544rld232"]
# stringList = ["Hello123", "Wo3544rld232", "No number", "Wo3544rld232"]
# stringList = ["Hello123", "Wo3544rld232", "No number"]
# stringList = ["Hello123", "Wo3544rld232", "No number"]

funny_sort(stringList) {|str, result| 
    number = getNumber(str)
    
    if number.eql?(-1) || result.size().eql?(0)
        result.insert(0, str)
    else
        result.each_index {|i|
            numberForElement = getNumber(result[i])

            if not numberForElement.eql?(-1)
                if number < numberForElement
                    result.insert(i, str)
                    break
                elsif i.eql?(result.size() - 1)
                    result.insert(i + 1, str)
                    break
                end
            else 
                result.insert(i + 1, str)
                break
            end
        }
    end

    result
}

