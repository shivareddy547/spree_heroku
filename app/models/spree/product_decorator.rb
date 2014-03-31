Spree::Product.class_eval do
searchable do
text :price,:tax_category_id
string :name
string :price
text :taxon do
   taxons.map(&:name).join(' ')
  end
  text :product_property do
   product_properties.map(&:value).join(' ')
  end
  integer :tax_category_id
  integer :price_i,multiple: true do
   price.to_i
  end

  integer :taxon_ids, multiple: true do
  taxons.map(&:id)
end
integer :product_properties_ids, multiple: true do
  product_properties.map(&:id)
end
  integer :variant_ids,multiple: true do
    #variants
    #variants.map{}
    variants.map{|n| n.option_values.map(&:id).flatten }.flatten

  end


end

 end