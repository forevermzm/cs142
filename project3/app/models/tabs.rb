class Tabs < ActiveRecord::Base
    
    def self.showFirst
        first = [[{:label => "Inventory", :url => "inventory.html"},
                  {:label => "Order Information", :url => "orderInformation.html"}, 
                  {:label => "Accounts", :url => "accounts.html"}, 
                  {:label => "Shippers", :url => "shippers.html"}, 
                  {:label => "Suppliers", :url => "suppliers.html"}], "Accounts"]
    end

    def self.showSecond
        second = [[{:label => "Xuedong", :url => "xuedong.html"},
                  {:label => "Zhemin", :url => "zhemin.html"}, 
                  {:label => "Sherry", :url => "sherry.html"}, 
                  {:label => "Jeremy", :url => "jeremy.html"}], "Sherry"]
    end
end