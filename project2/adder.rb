class Adder
    def initialize(num)
        @num = num
    end

    def method_missing(meth, *args, &block)
        methodName = meth.id2name
        if methodName.match('plus\d+')
            adderClass = class << self; self; end
            adderClass.class_eval do
                define_method(meth) do
                    number = methodName.scan(/\d+/)[0]
                    puts (@num + number.to_i)
                end
            end

            send(meth, *args, &block)
        else 
            super
        end
    end

end

x = Adder.new(10)
x.plus100()
x.plus10()

x.minus100()