/**
*   toast plugin
**/

var Toast = function(){
    this.selector = document.querySelector('.toast');
    if(this.selector === null){

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
    }

    
}

Toast.prototype = {
    timeout : 2000,
    selector : null,
    classes : [],
    toastTimeout : null,
    clickCallback : null,
    show : function(text, icon, closeOnClick){
        toast = this;
        //check if toast already shown, hide it, and show it again
        if(this.isShown()){
            this.hide();

            this.show(text, icon, closeOnClick);
        }

        //set text
        if(typeof text !== 'undefined'){
            this.selector.children.item('.toast-text').innerText = text;
        }

        //set icon
        if(typeof icon !== 'undefined'){
            //this.selector.children.item('.toast-icon').innerText = icon;
        }

        //add all custom classes
        this.classes.forEach(function(cls){
            toast.selector.classList.add(cls);
        });

        this.selector.classList.add('shown');
        this.selector.classList.add('bounceInUp');
        this.selector.classList.remove('bounceInDown');
        this.selector.style.bottom = '15px';
        this.selector.style.display = 'block';

        //set click on close handler
        if(closeOnClick === true){
            this.selector.addEventListener('click', function(){
                toast.hide();
                if(toast.clickCallback !== null){
                    toast.clickCallback(toast);
                }
            });
        }else if(closeOnClick === false){
          
            this.toastTimeout = setTimeout(function(){
                toast.hide();
            }, this.timeout);
        }else if(typeof closeOnClick === 'undefined'){
            this.selector.addEventListener('click', function(){
                if(toast.clickCallback !== null){
                    toast.clickCallback(toast);
                }
            });
            
        }
    }, 
    hide : function(){
        this.selector.removeEventListener('click', function(){
            return false;
        });
        clearTimeout(this.toastTimeout);
        this.selector.classList.remove('shown');
        this.selector.classList.remove('bounceInUp');
        this.selector.classList.add('bounceInDown');
        this.selector.style.bottom = '-150px';
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
    click : function(callback){
        if(typeof callback === 'function'){
            this.clickCallback = callback;
        }
    }
}
