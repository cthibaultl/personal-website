$(function(){
    
    var Application = new Class({
        axs : undefined,
        chart : undefined,
        works : undefined,
        navigation : function(navEl){
            navEl.on('click',function(e){
                var id = $(this).attr('href');
                
                e.preventDefault();
                $(this).parent().parent().find('.active').removeClass('active');
                $(this).parent().addClass('active');
                $(id).ScrollTo();
            });
        },
        constructor : function(){
            this.axs = new Application.Axs($('.skip'),$('#main .about h2'));
            this.chart = new Application.Chart('figure','732.819','683.582');
            this.works = new Application.Works($('.works-wrapper ul'),$(".works"));
            this.navigation($('.mainnav a'));
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