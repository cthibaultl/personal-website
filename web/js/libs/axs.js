var Axs;

$(function(){

    Axs = new Class({
        // Skip to main content link
        skip : function(skipEl,elToFocus){            
            if(elToFocus[0].length > 0){
            	elToFocus = elToFocus[0];
            } else {
            	elToFocus = elToFocus[1];
            }
            
            skipEl.on('click',function(e){
                e.preventDefault();
                elToFocus.attr('tabindex','-1');
                elToFocus.focus();
            });
            
            elToFocus.on('blur',function(){
                $(this).removeAttr('tabindex')
            });
        },
        // Add class hover
        addHover : function(){            
            $(document).on('hover', 'a, input, button, textarea, .isotope-item', '', function(){
                if($(this).is('.hover:focus') == false){
                    $(this).toggleClass('hover');
                }
            });
            $(document).on('blur', 'a, input, button, textarea, .isotope-item', '', function(){
                $(this).removeClass('hover');
            });
        },
        constructor : function(skipEl,elToFocus){
            this.skip(skipEl,elToFocus);
            this.addHover();
        }
    });

});