Spree::BaseHelper.class_eval do
   def taxons_tree(root_taxon, current_taxon,max_level = 1,products)
       return '' if max_level < 1 || root_taxon.children.empty?
      content_tag :div, class: 'grouped inline fields' do
       
        root_taxon.children.map do |taxon|
          css_class = (current_taxon && current_taxon.self_and_ancestors.include?(taxon)) ? 'current' : nil
          content_tag :div, class: 'field' do
          content_tag :div, class: "ui radio checkbox category_filter" do

            product_ids = products.map(&:id) rescue nil
           taxon_product_ids = taxon.products.map(&:id) rescue nil
          if taxon.children.present?
           taxon_product_ids =taxon.children.includes(:products).map(&:products).
                                  flatten.compact.uniq.map(&:id)
            product_ids = product_ids & taxon.children.includes(:products).map(&:products).
                                  flatten.compact.uniq.map(&:id)
          end



           @tax_product_count = []
           taxon_product_ids.each do |tax_pro|
            if product_ids.present?
           if product_ids.include?(tax_pro)
           @tax_product_count << tax_pro
           end 
         end
           end
          
if taxon.children.present?

           if params[:search].present? && params[:search][:category_filter].present?
          
            
          (radio_button_tag 'category_name', "#{taxon.id}", params[:search][:category_filter].include?(taxon.id.to_s) ? true : false, class: '',placeholder: "#{(taxon.children.map(&:id) << taxon.id )*","}" ) + (label_tag 'name', "#{taxon.name}" + "(" +"#{@tax_product_count.count}" + ")") 
else
  # (check_box_tag 'category_name', "#{taxon.id}",false, class: 'category_filter') + (label_tag 'name', "#{taxon.name}" + "(" +"#{@tax_product_count.count}" + ")") 
   (radio_button_tag 'category_name', taxon.id,false, class: 'ui radio checkbox category_filter',placeholder: "#{(taxon.children.map(&:id) << taxon.id )*","}" ) + (label_tag 'name', "#{taxon.name}" + "(" +"#{@tax_product_count.count}" + ")") 
end


else

 if params[:search].present? && params[:search][:category_filter].present?
                    
          (radio_button_tag 'category_name', "#{taxon.id}", params[:search][:category_filter].include?(taxon.id.to_s) ? true : false, class: 'ui radio checkbox category_filter') + (label_tag 'name', "#{taxon.name}" + "(" +"#{@tax_product_count.count}" + ")") 
else
  # (check_box_tag 'category_name', "#{taxon.id}",false, class: 'category_filter') + (label_tag 'name', "#{taxon.name}" + "(" +"#{@tax_product_count.count}" + ")") 
   (radio_button_tag 'category_name', taxon.id,false, class: 'ui radio checkbox category_filter',parent: 'yes') + (label_tag 'name', "#{taxon.name}" + "(" +"#{@tax_product_count.count}" + ")") 
end

end

end

          end
        end.join("\n").html_safe
      end
    end
    
  
end



def taxons_tree_brand(root_taxon, current_taxon,max_level = 1,products)
       return '' if max_level < 1 || root_taxon.children.empty?
      content_tag :div, class: 'grouped inline fields' do
       
        root_taxon.children.map do |taxon|
          css_class = (current_taxon && current_taxon.self_and_ancestors.include?(taxon)) ? 'current' : nil
          content_tag :div, class: 'field' do
          content_tag :div, class: "ui checkbox category_filter" do

            product_ids = products.map(&:id) rescue nil
           taxon_product_ids = taxon.products.map(&:id) rescue nil
          if taxon.children.present?
           taxon_product_ids =taxon.children.includes(:products).map(&:products).
                                  flatten.compact.uniq.map(&:id)
            product_ids = product_ids & taxon.children.includes(:products).map(&:products).
                                  flatten.compact.uniq.map(&:id)
          end



           @tax_product_count = []
           taxon_product_ids.each do |tax_pro|
            if product_ids.present?
           if product_ids.include?(tax_pro)
           @tax_product_count << tax_pro
           end 
         end
           end
          
if taxon.children.present?

           if params[:search].present? && params[:search][:category_filter].present?
          
            
          (check_box_tag 'category_name', "#{taxon.id}", params[:search][:category_filter].include?(taxon.id.to_s) ? true : false, class: '',placeholder: "#{(taxon.children.map(&:id) << taxon.id )*","}" ) + (label_tag 'name', "#{taxon.name}" + "(" +"#{@tax_product_count.count}" + ")") 
else
  # (check_box_tag 'category_name', "#{taxon.id}",false, class: 'category_filter') + (label_tag 'name', "#{taxon.name}" + "(" +"#{@tax_product_count.count}" + ")") 
   (check_box_tag 'category_name', taxon.id,false, class: 'ui  checkbox category_filter',placeholder: "#{(taxon.children.map(&:id) << taxon.id )*","}" ) + (label_tag 'name', "#{taxon.name}" + "(" +"#{@tax_product_count.count}" + ")") 
end


else

 if params[:search].present? && params[:search][:category_filter].present?
                    
          (check_box_tag 'category_name', "#{taxon.id}", params[:search][:category_filter].include?(taxon.id.to_s) ? true : false, class: 'ui checkbox category_filter') + (label_tag 'name', "#{taxon.name}" + "(" +"#{@tax_product_count.count}" + ")") 
else
  # (check_box_tag 'category_name', "#{taxon.id}",false, class: 'category_filter') + (label_tag 'name', "#{taxon.name}" + "(" +"#{@tax_product_count.count}" + ")") 
   (check_box_tag 'category_name', taxon.id,false, class: 'ui checkbox category_filter',parent: 'yes') + (label_tag 'name', "#{taxon.name}" + "(" +"#{@tax_product_count.count}" + ")") 
end

end

end

          end
        end.join("\n").html_safe
      end
    end
    
  
