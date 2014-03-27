Spree::BaseHelper.class_eval do
   def taxons_tree(root_taxon, current_taxon,max_level = 1,products)
       return '' if max_level < 1 || root_taxon.children.empty?
      content_tag :ul, class: 'taxons-list' do
        root_taxon.children.map do |taxon|
          css_class = (current_taxon && current_taxon.self_and_ancestors.include?(taxon)) ? 'current' : nil
          content_tag :li, class: css_class do
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
           link_to("#{taxon.name}" + "(" +"#{@tax_product_count.count}" + ")", "/products" + "?id=#{taxon.id}&search_params=#{@taxon_category_ids.present? ? @taxon_category_ids : taxon.id.to_i  }&search[price_range_any]=#{session[:sunpot_price_new_range] rescue nil}&search[brand_any]=#{session[:sunpot_brand_any] rescue nil}&keywords=#{params[:keywords]}&search[price_with_slider]=#{params[:search][:price_with_slider] rescue nil}&low_to_high=#{params[:low_to_high] rescue nil}&high_to_low=#{params[:high_to_low] rescue nil}"  ,:class=>"taxon_class",:disabled => true) +
           taxons_tree(taxon, current_taxon, max_level - 1,products)

          end
        end.join("\n").html_safe
      end
   end
end
