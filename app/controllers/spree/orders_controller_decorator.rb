Spree::OrdersController.class_eval do

layout 'spree/layouts/semantic_layout'

def populate
p 111111111111
      populator = Spree::OrderPopulator.new(current_order(create_order_if_necessary: true), current_currency)
      if populator.populate(params[:variant_id], params[:quantity])
        current_order.ensure_updated_shipments
if request.xhr?
  # respond to Ajax request
render json: {:count => current_order.line_items.count}

else
  # respond to normal request
   respond_with(@order) do |format|
          format.html { redirect_to cart_path }
        end
end
       
        #render :nothing => true
      else
        flash[:error] = populator.errors.full_messages.join(" ")
        redirect_to :back
      end
    end

end 
