class StateController < ApplicationController  

    def filter
        @results = []
        if params[:subString] != nil then
            @subString = params[:subString]
            @results = State.filter(@subString)
        end
    end
end