
Spree::ProductsController.class_eval do


 def index

         #params[:search] = params[:keywords]
p 111111111111111111111111111111111111
p 111111111111111111111111111111111111

if params[:search_field_params].present? || params[:remove_id].present? 
      session[:sunspot_search]=[]
      session[:sunpot_search_remove] = []
end
if request.url.split('/').last == "products" || request.fullpath=="/"
      session[:sunpot_search_remove] = []
      session[:sunpot_price_range] = []
      session[:sunpot_price_new_range]=[]
      session[:sunpot_price_remove_range]=[]
      session[:sunpot_price_over] = []
      session[:sunpot_price_any] =[]

      session[:sunpot_price_remove_any] = []
      session[:sunpot_price_over] = []
      session[:sunpot_brand_any] = []
      session[:sunpot_brand_remove_any] = []
      session[:sunpot_brand_any_array] = []
       
      session[:sunspot_search]=[]
      session[:sunpot_search_remove] = []
end

session[:sunpot_price_any] ||= []
session[:sunpot_price_remove_any] ||= []

# For Prices 

  if params[:search].present? 
   if session[:sunpot_price_any].present?
      if !session[:sunpot_price_any].include?(params[:search][:price_range_array_any])
    session[:sunpot_price_any] << params[:search][:price_range_array_any]
    session[:sunpot_price_any] = session[:sunpot_price_any].compact
      end
    else
      
      session[:sunpot_price_any] << params[:search][:price_range_array_any]
      session[:sunpot_price_any] = session[:sunpot_price_any].compact
    end

       if !params[:search][:price_remove_range].present?
      params[:search][:price_range_any]= session[:sunpot_price_any]
      end
      
      if session[:sunpot_price_any].present? && params[:search][:price_remove_range].present?
       
        if session[:sunpot_price_remove_any].present? && !session[:sunpot_price_remove_any].include?(params[:search][:price_remove_range])
        session[:sunpot_price_remove_any] << params[:search][:price_remove_range]
        session[:sunpot_price_remove_any] = session[:sunpot_price_remove_any].compact
        else
          session[:sunpot_price_remove_any] << params[:search][:price_remove_range]
          session[:sunpot_price_remove_any] = session[:sunpot_price_remove_any].compact
        end
       
         if session[:sunpot_price_any].include?(params[:search][:price_remove_range])
          
            session[:sunpot_price_remove_any].compact
            params[:search][:price_range_any]= session[:sunpot_price_any].compact - session[:sunpot_price_remove_any].compact
            session[:sunpot_price_any] = params[:search][:price_range_any]
            session[:sunpot_price_remove_any] = []
   
    if !params[:search][:price_range_any].present?
      session[:sunpot_price_any] = []
      session[:sunpot_price_remove_any] = []
    end 
    end
     end
    end
        
      #@taxon = Taxon.find(params[:id]) if params[:id]
   
      session[:sunpot_search] ||= []
      session[:sunpot_search_remove] ||= []
      session[:sunpot_price_range] ||= []

      if !params[:tax_cat_id].present?
        session[:sunpot_search_remove] = []
      end

      if session[:sunpot_search_remove].present?

        if !session[:sunpot_search_remove].include?(params[:tax_cat_id])

          session[:sunpot_search_remove] << params[:tax_cat_id].to_i
          
          
        end
      else

        session[:sunpot_search_remove] = [params[:tax_cat_id]]
        params.delete :tax_cat_id if params[:tax_cat_id]
        params[:tax_cat_id] = ""

      end
      if  params[:id].present?

        @taxon = Spree::Taxon.find(params[:id]) if params[:id].present?
     
        if session[:sunspot_search].present? && params[:id].present?
          if !session[:sunspot_search].include?(params[:id])
            session[:sunspot_search] << params[:id].to_i
          end
        else
          session[:sunspot_search] = [params[:id]]
        end

        if session[:sunspot_search].present? && session[:sunpot_search_remove].present?

         session[:sunspot_search] = session[:sunspot_search].map{|chr| chr.to_i}

          session[:sunspot_search] = session[:sunspot_search].compact - session[:sunpot_search_remove].compact
           session[:sunspot_search] = session[:sunspot_search].compact
      
        else

        end
      end

      price_array = []
      if params[:search].present?
        if params[:search][:price_range_array_any].present?
          p "++++++price params ++"

          price_split = params[:search][:price_range_array_any].split('$').map{|chr| chr.to_i}.reject! {|x| x <= 0}
          if session[:sunpot_price_range].present?
            price_split.each do |p_a|
              if !session[:sunpot_price_range].include?(p_a)
                session[:sunpot_price_range] << p_a
              end

            end

          else

          #  price_split = params[:search][:price_range_any].split('$').map{|chr| chr.to_i}.reject! {|x| x <= 0}

          #p price_split
            session[:sunpot_price_range] << price_split

          end
        end
      end
  

      #price_sorting_min = session[:sunpot_price_range].flatten.sort.first
      price_sorting_max = session[:sunpot_price_range].flatten.sort.last

      session[:sunpot_price_over] ||= []
      if params[:search].present?
        if params[:search][:price_range_array_any].present?
     
          if params[:search][:price_range_array_any].include?('Under')

          #price_sorting_min_less = params[:search][:price_range_any].split('$')[1].to_i
          end
          if params[:search][:price_range_array_any].include?('over')
           

            price_sorting_max_greter = params[:search][:price_range_array_any].split('$')[1].to_i
            if session[:sunpot_price_over].present? 
            session[:sunpot_price_over] = price_sorting_max_greter
          else
            session[:sunpot_price_over] = price_sorting_max_greter
          end
           
          end
        end
      end

      #session[:sunpot_price_range].include?('')

      session[:sunpot_price_new_range] ||= []
      new_split=[]
      if params[:search].present? && params[:search][:price_range_array_any].present? && !params[:search][:price_range_array_any].include?('over') 
       
        price_new_split = params[:search][:price_range_array_any].split('-').each do |sp|

          new_split << sp.split('$')[1].to_i
        end
     
        session[:sunpot_price_new_range]  << new_split

      end

      session[:sunpot_price_remove_range] ||= []
      remove_split=[]
      if params[:search].present? && params[:search][:price_remove_range].present?
        price_remove_new_split = params[:search][:price_remove_range].split('-').each do |sp|

          remove_split << sp.split('$')[1].to_i
        end
        p remove_split
        session[:sunpot_price_remove_range]  << remove_split

        if params[:search][:price_remove_range].include?('over')

          price_remove_max_greter = params[:search][:price_remove_range].split('$')[1].to_i

        end

      end
    
      if session[:sunpot_price_new_range].present? && session[:sunpot_price_remove_range].present?
        
        session[:sunpot_price_new_range] = session[:sunpot_price_new_range] - session[:sunpot_price_remove_range]
      if !session[:sunpot_price_new_range].present?
         session[:sunpot_price_remove_range] = []
      end

      end

if price_remove_max_greter.present? && price_sorting_max_greter.present?
          
          if price_remove_max_greter == price_sorting_max_greter
            
            session[:sunpot_price_over] = []
          end
          
        end
        if price_remove_max_greter.present? && session[:sunpot_price_over].present?
if price_remove_max_greter == session[:sunpot_price_over]
            
            session[:sunpot_price_over] = []
          end

        end

session[:sunpot_brand_any] ||= []
session[:sunpot_brand_any_array] ||= []
session[:sunpot_brand_remove_any] ||= []

if params[:search].present?
if params[:search][:brand_array_any].present?
    if session[:sunpot_brand_any].present? && !session[:sunpot_brand_any_array].include?(params[:search][:brand_array_any])
 session[:sunpot_brand_any_array] << params[:search][:brand_array_any]
 session[:sunpot_brand_any] = session[:sunpot_brand_any].to_s + " " + params[:search][:brand_array_any].to_s
 params[:search][:brand_any] = session[:sunpot_brand_any_array]
else
  session[:sunpot_brand_any_array] << params[:search][:brand_array_any]
 session[:sunpot_brand_any] = params[:search][:brand_array_any].to_s 
 params[:search][:brand_any] = session[:sunpot_brand_any_array]
  end
  end
  
  # remove brand from list 

  if session[:sunpot_brand_any_array].present? && params[:search][:brand_remove].present?
    @array =[]
@array << params[:search][:brand_remove]
   session[:sunpot_brand_any_array] = session[:sunpot_brand_any_array] - @array
  params[:search][:brand_any] = session[:sunpot_brand_any_array]
  session[:sunpot_brand_any] = params[:search][:sunpot_brand_any_array]

else
  session[:sunpot_brand_any] = session[:sunpot_brand_any_array]

  end

  end


if params[:search] && params[:search][:brand_any].present?

session[:sunpot_brand_any_array]
end

@minimum_price = Spree::Product.all.sort_by(&:price).first.price.to_i
@maximum_price = Spree::Product.all.sort_by(&:price).reverse.first.price.to_i

if params[:search].present?
@minimum = params[:search][:price_with_slider].split(',')[0] if params[:search][:price_with_slider].present?
 @maximum = params[:search][:price_with_slider].split(',')[1] if params[:search][:price_with_slider].present?
price_params = params[:search][:price_with_slider].split(',') if params[:search][:price_with_slider].present?
 
end



@searcher = Spree::Product.solr_search do

if params[:search].present?

  if session[:sunpot_brand_any_array].present?
fulltext session[:sunpot_brand_any_array]
else
 #fulltext params[:id].split('/').last
  end

any_of do
if session[:sunpot_price_over].present?
 with(:price).greater_than_or_equal_to(session[:sunpot_price_over])
end
if session[:sunpot_price_new_range].present?
  session[:sunpot_price_new_range].each do |map|
  with(:price).between(map[0].to_i..map[1].to_i)
end
end
 if params[:search][:price_with_slider].present?
  with(:price_i).between(price_params[0].to_i..price_params[1].to_i)
end
end



any_of do
#with(:tax_category,params[:search_params])
with(:taxon_ids).all_of(session[:sunspot_search])
#with(:taxon_ids,params[:search_params])
end

fulltext params[:keywords]
if params[:low_to_high].present?
order_by(:price, :asc) 
end
if params[:high_to_low].present?
order_by(:price, :desc) 
end


else
    fulltext params[:keywords]
    with(:taxon_ids).all_of(session[:sunspot_search]) if session[:sunspot_search]
if params[:low_to_high].present?
order_by(:price, :asc) 
end
if params[:high_to_low].present?
order_by(:price, :desc) 
end



end


end


      @products = @searcher.results
      @products_count= @products.count if @products
      
      @taxon_category_ids= session[:sunspot_search]




      params.delete :tax_cat_id

      if @taxon_category_ids.present?
        @taxon_categories = Spree::Taxon.where(:id => @taxon_category_ids)
      end
      @taxonomies = Spree::Taxonomy.includes(root: :children)
      
p "++++++++===products+++++++==="
p @products
p "+====="

     #respond_with @products

 if request.xhr?
        #render :partial => "spree/shared/products",:locals=> {:products => @products}
 render  "spree/products/index",:layout=>"spree/layouts/custom_layout",:minimum => @minimum,:maximum=>@maximum
  end

    # @searcher = build_searcher(params)
    # @products = @searcher.retrieve_products
    # @taxonomies = Spree::Taxonomy.includes(root: :children)
    end
end