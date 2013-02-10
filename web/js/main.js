$(function(){
    
    var Application = new Class({
        axs : undefined,
        chart : undefined,
        works : undefined,
        navigation : function(navEl){
            var isHome = $('#about').length,
            	isHash = document.location.hash,
            	$this = this;
            	
            if(isHome){
            	navEl.eq(0).addClass('active');
            }
            
            if(isHash){
            	$this.navToContent(navEl,isHash);
            }
            
            navEl.find('a').on('click',function(e){
                var id = $(this).attr('href').substr(1,100);
                
                if(isHome){
	                e.preventDefault();
	                
	                $this.navToContent(navEl,id);
                }
            });
        },
        navToContent : function(navEl,id){
        	var current = navEl.find('a[href="/'+id+'"]');
        	
        	navEl.parent().find('.active').removeClass('active');
            current.parent().addClass('active');
            
            $(id).ScrollTo();
            
            // Ne faire le focus que si c'est au clavier
            $(id).find('a,button').eq(0).focus();
        },
        constructor : function(){
            this.axs = new Application.Axs($('.skip'),[$('#main .about h2'),$('#main h1')]);
            this.chart = new Application.Chart('figure','732.819','683.582');
            this.works = new Application.Works($('.works-wrapper ul'),$(".works"));
            this.navigation($('.mainnav li'));
        }
    });
    
    // Accessibility
    Application.Axs = Axs;
    
    // Figure
    Application.Chart = Chart;
    
    // Works section
    Application.Works = Works;
    
    var App = new Application();
    
});