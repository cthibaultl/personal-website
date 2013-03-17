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
        worksH : undefined,
        loadImagesBefore : function(callback){
            var $this = this;
            
            $this.container.imagesLoaded(function(){
                $this.thumbsList = $this.container.isotope({
                    itemSelector : 'li',
                    layoutMode : 'masonry'
                });
                
                worksH = $this.wrapper.find('.works-wrapper').height();
                
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
                var li = $('<li><button data-filter="'+categories[i].data+'"><span class="visuallyhidden">Filtrer par </span> <span class="txt">'+categories[i].txt+'</span></button></li>')
                if(i == 0){
                    li.find('button').addClass('active');
                }
                ul.append(li);
            }
            
            return ul;
        },
        transformInBtn : function(){
            this.thumbsList.find('li .wrap').each(function(){
                //var txt = $(this).parent().parent().find('img').attr('alt');
                $(this).prepend('<span class="visuallyhidden">Voir le détail du projet </span>');
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
                
                var txtArialive = 'Les projets '+$(this).find('.txt').text()+' sont affichés.';
                $('#arialive').text(txtArialive);
                
                $this.container.css('overflow','hidden');
                
                $this.thumbsList.find('li .wrapper').css('display','block');
                $this.container.isotope( 'reLayout', function(list){
	                $this.thumbsList.find('li .wrapper').css('display','none');
	                for(var i=0; i < list.length; i++){
		                $(list[i]).find('.wrapper').css('display','block');
	                }
	                //$this.container.css('overflow','hidden');
	                
	                var h = $($this.container).height();
	                $this.wrapper.find('.works-wrapper').animate({
		                height:h
	                },300, function(){
		                $this.wrapper.find('.works-wrapper').height('auto');
		                worksH = $this.wrapper.find('.works-wrapper').height();
	                });
                });
            });
        },
        bindClickThumb : function(){
            var $this = this;
            
            $this.thumbsList.find('li button, li').on('click',function(){
                var el = $(this),
                	id,
                	title,
                	keyboardUser = false,
                	bigH;

                if(!$(this).hasClass('hover')){
                    keyboardUser = true;
                }
                
                if(el[0].tagName.toUpperCase() == 'BUTTON'){
                    id = el.parent().attr('id');
                } else {
                    id = el.attr('id');
                }
        		
        		$this.active = id;
        		
        		bigH = $this.bigs.find('.'+id+' img')[0].height;
        		
                $this.bigs.find('.'+id).addClass('active').fadeIn();
                
                $this.wrapper.find('.works-wrapper').animate({
	                height:bigH
                },500);
                
                title = $this.bigs.find('.'+id+' h3');                
                if(keyboardUser){
	                if(title.find('a').length == 0){
	                	title.attr('tabindex','-1').focus();
	                } else {
	                	title.find('a').focus();
	                }
                }
                                
                $this.changeFilter('none');
                
                $this.container.css('overflow','hidden');
                
                $this.container.isotope( 'reLayout', function(){
	            	$this.thumbsList.find('li .wrapper').css('display','none');
                });
            });
        },
        bindClickBackBtn : function(){
            var $this = this,
                keyboardUser = false;
            
            this.bigs.on('click','.back button',function(){
                $this.bigs.find('.active').fadeOut();
                $this.wrapper.find('.works-wrapper').animate({
	                height:worksH
                },500, function(){
	                $this.wrapper.find('.works-wrapper').height('auto');
                });
                
                $this.changeFilter($this.selector);
                //$this.container.css('overflow','visible');
                
                $this.thumbsList.find('li .wrapper').css('display','block');
                
                if(!$(this).hasClass('hover')){
                    keyboardUser = true;
                }
                
                if(keyboardUser){
                	$this.thumbsList.find('#'+$this.active+' button').focus();
                }
            });
        },
        bindFocusOutTitle : function(){
        	var $this = this;
        	
        	$this.bigs.find('h3').on('focusout',function(){
        		$(this).removeAttr('tabindex');
        	});
        },
        changeFilter : function(filt, callback){
            this.container.isotope({ filter: filt });
            
            this.container.isotope( 'reLayout', function(){
            	if(callback){
	            	callback();
            	}
            });
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