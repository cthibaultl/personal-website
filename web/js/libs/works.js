var Works;

$(function(){

    Works = new Class({
        selector : '.all',
        container : undefined,
        filterList : undefined,
        thumbsList : undefined,
        wrapper : undefined,
        bigs : undefined,
        active : undefined,
        loadImagesBefore : function(callback){
            var $this = this;
            
            $this.container.imagesLoaded(function(){
                $this.thumbsList = $this.container.isotope({
                    itemSelector : 'li',
                    layoutMode : 'masonry'
                });
                
                $this.container.css('overflow','visible');
                
                if(callback){
                    callback();
                }
            });
        },
        createBackBtn : function(){
            this.bigs.find('.big .desc').after('<p class="back"><button>Retourner à la liste des projets</button></p>');
        },
        createFilterList : function(){
            var ul = $('<ul></ul>'),
                categories = [{data:'all',txt:'Tous'},
                            {data:'web',txt:'Web'},
                            {data:'identity',txt:'Identité visuelle'},
                            {data:'print',txt:'Imprimé'},
                            {data:'draw',txt:'Dessin'}];
            
            for(var i=0; i < categories.length; i++){
                var li = $('<li><button data-filter="'+categories[i].data+'">'+categories[i].txt+'</button></li>')
                if(i == 0){
                    li.find('button').addClass('active');
                }
                ul.append(li);
            }
            
            return ul;
        },
        transformInBtn : function(){
            this.thumbsList.find('li .wrap').each(function(){
                var txt = $(this).parent().find('img').attr('alt');
                $(this).append('<span class="visuallyhidden">Voir le détail du projet '+txt+'</span>');
                var ctn = $(this).html();
                var btn = $('<button></button>')
                
                btn.append(ctn);
                $(this).after(btn);
                $(this).remove();
            });
        },
        bindClickFilter : function(){
            var $this = this;
            
            this.filterList.find('button').click(function(){
                $this.selector = '.'+$(this).attr('data-filter');
                $this.changeFilter($this.selector);
                $(this).parent().parent().find('.active').removeClass('active');
                $(this).addClass('active');
                $this.bigs.find('.big').fadeOut(500);
            });
        },
        bindClickThumb : function(){
            var $this = this;
            
            $this.thumbsList.find('li button, li').on('click',function(){
                var el = $(this),
                	id,
                	title;
                
                if(el[0].tagName.toUpperCase() == 'BUTTON'){
                    id = el.parent().attr('id');
                } else {
                    id = el.attr('id');
                }
        		
        		$this.active = id;
        		
                $this.bigs.find('.'+id).addClass('active').fadeIn();
                
                title = $this.bigs.find('.'+id+' h3');
                if(title.find('a').length == 0){
                	title.attr('tabindex','-1').focus();
                } else {
                	title.find('a').focus();
                }
                                
                $this.changeFilter('none');
                
                $this.container.css('overflow','hidden');
            });
        },
        bindClickBackBtn : function(){
            var $this = this;
            
            this.bigs.on('click','.back button',function(){
                $this.bigs.find('.active').fadeOut();
                $this.changeFilter($this.selector);
                $this.container.css('overflow','visible');
                
                $this.thumbsList.find('#'+$this.active+' button').focus();
            });
        },
        bindFocusOutTitle : function(){
        	var $this = this;
        	
        	$this.bigs.find('h3').on('focusout',function(){
        		$(this).removeAttr('tabindex');
        	});
        },
        changeFilter : function(filt){
            this.container.isotope({ filter: filt });
        },
        constructor : function(ctn,wrapper){
            var $this = this;
            
            this.wrapper = wrapper;
            this.bigs = this.wrapper.find('.bigs');
            this.container = ctn;
            
            this.loadImagesBefore(function(){
                $this.createBackBtn();
                $this.transformInBtn();
                
                $this.bindClickFilter();
                $this.bindClickThumb();
                $this.bindClickBackBtn();
                $this.bindFocusOutTitle();
            });
            
            this.filterList = this.createFilterList();
            this.wrapper.prepend(this.filterList);
        }
    });

});