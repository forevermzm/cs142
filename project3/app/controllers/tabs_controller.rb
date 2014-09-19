class TabsController < ApplicationController
    def show2
        @firstRow = Tabs.showFirst()
        @secondRow = Tabs.showSecond()
    end
end