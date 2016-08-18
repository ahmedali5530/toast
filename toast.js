/**
*   toast plugin
**/

var Toast = function(){
    this.selector = document.querySelector('.toast');
    if(this.selector === null){
        this.create();
    }else{
        this.remove().create();
        //reset classes
        this.classes = [];
    }
}

Toast.prototype = {
    timeout : 3000,
    selector : null,
    classes : [],
    toastTimeout : null,
    clickCallback : null,
    skins : ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey', 'black', 'white'],
    create : function(){
        //create new toast from scratch in DOM
        var div = document.createElement('div');
        div.classList.add('toast');
        var toastText = document.createElement('div');
        toastText.classList.add('toast-text');

        var toastIcon = document.createElement('div');
        toastIcon.classList.add('toast-icon');

        div.appendChild(toastText);
        div.appendChild(toastIcon);
        
        //now append it to body
        document.body.appendChild(div);

        this.selector = document.querySelector('.toast');
    },
    remove : function(){
        //removes the toast from DOM
        this.selector.remove();
        return this;
    },
    show : function(text, icon, sticky){
        toast = this;
        //check if toast already shown, hide it, and show it again
        if(this.isShown()){
            this.hide();

            this.show(text, icon, sticky);
        }

        //set text
        if(typeof text !== 'undefined'){
            this.selector.children.item(0).innerHTML = text;
        }

        //set icon
        if(typeof icon !== 'undefined'){
            this.selector.children.item(1).innerHTML = icon;
        }

        //add all custom classes
        this.classes.forEach(function(cls){
            toast.selector.classList.add(cls);
        });

        this.selector.classList.add('shown');
        this.selector.classList.add('animated');

        //remove OUT class
        this.selector.classList.remove('bounceOutDown');
        
        //add IN class
        this.selector.classList.add('bounceInUp');
        
        // this.selector.style.bottom = '15px';
        this.selector.style.display = 'block';

        //set click on close handler
        if(sticky === true){
            this.selector.addEventListener('click', function(){
                toast.hide();
                if(toast.clickCallback !== null){
                    toast.clickCallback(toast);

                    toast.clickCallback = null;
                }
            });
        }else if(sticky === false){
          
            this.toastTimeout = setTimeout(function(){
                toast.hide();
            }, this.timeout);
        }else if(typeof sticky === 'undefined'){
            this.selector.addEventListener('click', function(){
                if(toast.clickCallback !== null){
                    toast.clickCallback(toast);

                    toast.clickCallback = null;
                }
            });
            
        }

        //reset the skin now
        // this.resetSkin();
    }, 
    hide : function(){
        this.selector.removeEventListener('click', function(){
            return false;
        });
        clearTimeout(this.toastTimeout);

        this.selector.classList.remove('shown');

        //remove the IN class
        this.selector.classList.remove('bounceInUp');
        
        //add OUT class
        this.selector.classList.add('bounceOutDown');
        // this.selector.style.bottom = '-150px';
    },
    isShown : function(){
        return this.selector.classList.contains('shown');
    }, 
    isHidden : function(){
        return !this.selector.classList.contains('shown');
    },
    setTimeout : function(timeout){
        this.timeout = timeout;
        return this;
    },
    addClass : function(colorClass){
        this.classes.push(colorClass);
        return this;
    },
    skin : function(skin){
        return this.addClass(skin);
    },
    resetSkin : function(){
        //remove any applied skins, so that other toasts wont be mess up with current toast
        toast = this;
        this.skins.forEach(function(skin){
            toast.selector.classList.remove(skin);
        });
    },
    click : function(callback){
        if(typeof callback === 'function'){
            this.clickCallback = callback;
        }
    }
}
