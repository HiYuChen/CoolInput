function CoolInput(setting) {
    //setting.data;
    //setting.slt;
    var _this = this; 
    _this.cursorPosition = -1;
    _this.cursorX = -1;
    _this.focused = false;
    _this.inputEl = $(setting.slt); 
    
    var modelVar = _this.inputEl.attr('v-model');
    _this.inputEl.attr('readonly', 'readonly');
    if (_this.inputEl.length === 0) throw (slt + ' not exist');
    var input = _this.inputEl[0];

    if (!CoolInput.arrInputEl) CoolInput.arrInputEl = [];
    CoolInput.arrInputEl.push(input);
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",  "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    } 
    var isOnPC = IsPC();

    function val(newV) {
        if (newV != undefined) {
            if (input.tagName === 'DIV') {
                input.innerText = newV;
            }
            else if (input.value != undefined) {
                input.value = newV;
            }
        }
        else {
            if (input.tagName === 'DIV') {
                return input.innerText;
            }
            else if (input.value != undefined) {
                return input.value;
            }
        }
    }
    function getTextWidth(txt,size) {
        var tmpDiv = window.coolInputTmpDiv;
        if (!tmpDiv) {
            tmpDiv = window.coolInputTmpDiv = $('<div style="position:fixed;display:block;z-index:99999;top:300px;left:100px;visibility:hidden;"><div>');
            $(document.body).append(tmpDiv);
           
            
           // tmpDiv.css('top', _this.inputEl.offset().top - 30 + 'px');
            //tmpDiv.css('left', _this.inputEl.offset().left + 'px');
        }
        var fontSize = _this.inputEl.css('font-size');
        tmpDiv.css('font-size', fontSize);
        tmpDiv.css('font-weight', _this.inputEl.css('font-weight'));
        var sp = _this.inputEl.css('letter-spacing');
        tmpDiv.css('letter-spacing', sp); 
        var fnt = _this.inputEl.css('font-family');
        tmpDiv.css('font-family', fnt); 
        tmpDiv.html(txt);
        if (size) {
            size.height = tmpDiv[0].offsetHeight; size.width = tmpDiv[0].offsetWidth;
        }
        return tmpDiv[0].offsetWidth;// width();
    }
    this.showPanel = function (mouseDownEvent) { 
        var Panel = _this.Panel = $('#coolInputPanel');
        if (Panel.length === 0) {
            var style = `<style>
                #coolInputPanel>div{
                    width: 31%;height:40px;text-align:center;line-height:40px;
border-width:1px;border-style:solid;border-color:#cacaca;border-top-style:none;border-left-style:none;
              }
 #coolInputPanel>div:nth-child(n+10){border-bottom-style:none;}
 #coolInputPanel>div:nth-child(3n){ border-right-style:none;}
 #coolInputPanel>div:active{background-color:#7af;} 
             
</style>`;
            $(document.body).append($(style));
            var divHtml = ` 
            <div id="coolInputPanel" style="background-color:#dedede;font-size:18px;font-weight:bold; position:fixed;left:0px;bottom:0px;width:100%;height:200px;display:flex;justify-content:center;align-content:center; flex-wrap:wrap;z-index:99999;">
                 <div>1</div><div>2</div><div>3</div>
                 <div>4</div><div>5</div><div>6</div>
                 <div>7</div><div>8</div><div>9</div>
                 <div>.</div><div>0</div>
                 <div id="del"> 
                    <svg style="display:inline;height:23px;width:23px;margin-top:9px;"  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                      <g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M3781.8,3617c-116.7-17.2-350.2-82.3-482.2-137.8c-344.4-141.6-317.6-118.6-1722.2-1519.4C186.2,572.5,191.9,578.2,126.9,329.5C73.3,119,100.1-104.9,205.3-317.3c40.2-78.5,311.9-363.6,1333.8-1387.4c1379.7-1381.6,1408.4-1408.4,1743.3-1548.1c82.3-34.4,216.2-82.3,296.6-107.1l145.4-42.1l2669.4-5.7c1883-3.8,2698.1,1.9,2769,15.3c334.9,70.8,616.2,342.5,704.2,683.2c44,164.6,44,5472.9,0,5637.4c-86.1,331.1-340.6,587.5-669.7,673.6c-99.5,24.9-436.3,28.7-2736.4,26.8C5019.9,3626.6,3814.3,3620.8,3781.8,3617z M9141.7,2968.3c28.7-21.1,70.8-63.1,91.9-91.9c40.2-51.7,40.2-55.5,40.2-2767c0-2711.6,0-2715.4-40.2-2767c-21.1-28.7-63.2-70.8-91.9-91.9c-51.7-40.2-61.2-40.2-2648.4-45.9c-2543.2-3.8-2598.7-3.8-2747.9,34.4c-84.2,21-225.8,72.7-315.7,116.7l-164.6,78.5L1998.3-1299C622.5,75,687.5,0.3,718.2,182.1c11.5,63.2,158.8,214.3,1280.2,1335.7c1264.9,1264.9,1266.8,1266.8,1429.4,1345.2c340.6,164.6,111,153.1,3056,149.3C9082.4,3008.5,9090.1,3008.5,9141.7,2968.3z"/><path d="M4566.4,1919.7c-78.5-34.4-158.8-132-174.1-212.4c-30.6-168.4-40.2-156.9,706.1-903.2l692.7-694.6l-692.7-692.7c-748.2-750.1-736.7-736.7-704.2-909c17.2-93.8,132-208.6,225.8-225.8c172.2-32.5,158.8-44,909,704.2l692.7,692.7l694.6-692.7c748.2-748.2,734.8-736.7,907-704.2c93.8,17.2,208.6,132,225.8,225.8c32.5,172.2,44,158.8-704.2,909l-692.7,692.7L7344.9,804c748.2,748.2,736.7,734.8,704.2,907.1c-17.2,93.8-132,208.6-225.8,225.8c-172.2,32.5-158.8,44-909-704.2L6221.6,540l-685.1,683.1c-375,375.1-708,692.7-736.7,704.2C4727.1,1954.1,4637.2,1950.3,4566.4,1919.7z"/></g></g>
                    </svg> 
                  </div>
            </div>`;
            Panel = _this.Panel = $(divHtml);
            $(document.body).append(Panel);

        }
        if (isOnPC) {
            Panel[0].onmousedown = onTouchPanel;
        }
        else
            Panel[0].ontouchstart = onTouchPanel;
        if (mouseDownEvent) {
          //  mouseDownEvent.preventDefault();
          //  mouseDownEvent.stopPropagation(); 
        }
         function onTouchPanel (evt) {
            var digit = evt.target.innerText;
            
            var txt = val();
            var targetDiv = evt.target;
            if (evt.target.tagName !== 'DIV')
                targetDiv = $(evt.target).parents('div')[0];

            if (targetDiv.id === 'del' ) {
                if (_this.cursorPosition === val().length) {
                    val(txt.substr(0, txt.length - 1));
                    _this.cursorX = getTextWidth(val());
                    _this.cursorPosition--;
                }
                else {

                    val(txt.substring(0, _this.cursorPosition - 1) + txt.substring(_this.cursorPosition, txt.length));
                    _this.cursorPosition--;
                    _this.cursorX = getTextWidth(val().substring(0, _this.cursorPosition));

                }
            }
            else if (digit && digit.length === 1 && '0,1,2,3,4,5,6,7,8,9,.'.indexOf(digit) >= 0) {

                if (_this.cursorPosition === val().length) {
                    val(txt + digit);
                    _this.cursorX = getTextWidth(val());
                    _this.cursorPosition++;
                }
                else {
                    val(txt.substring(0, _this.cursorPosition) + digit + txt.substring(_this.cursorPosition, txt.length));
                    _this.cursorPosition++;
                    _this.cursorX = getTextWidth(val().substring(0, _this.cursorPosition));

                }
            }
            else {
                var ffff = 8;
            }
            showCursor(true);
            if (setting.data && modelVar) {
                setting.data[modelVar] = val();
            }
        };
        if (!_this.focused) { 
            if (_this.Panel.css('display') === 'none') {
                _this.Panel.css('margin-bottom', - _this.Panel.height());
                _this.Panel.show();
                _this.Panel.animate({ 'margin-bottom': '0px' }, { duration: 400 });
            } 
        }

        var top = _this.inputEl.offset().top;
        var left = _this.inputEl.offset().left;

        if (!mouseDownEvent || val().length === 0) {
            _this.cursorPosition = val().length;
            _this.cursorX = getTextWidth(val());
        }
        else {
            var insertIndex = -1;
            var preDigitX = -1; var curDigitX = -1;
            for (var i = 0; i < val().length; i++) {
                var bc = val().substring(0, i + 1);
                var wd = getTextWidth(bc);
                var curDigit = val().substr(i, 1);
                var digitWd = getTextWidth(curDigit);
                curDigitX = wd - digitWd / 2;
                if (mouseDownEvent.offsetX > preDigitX && mouseDownEvent.offsetX <= curDigitX) {
                    _this.cursorPosition = i;
                    _this.cursorX = wd - digitWd;
                    break;
                }
                else if (i === val().length - 1) {
                    _this.cursorPosition = val().length;
                    _this.cursorX = wd;
                }
                preDigitX = curDigitX;
            }
        }

        if (!_this.tmCoolInput) {
            var bShow = true;
            _this.tmCoolInput = setInterval(function () {
                showCursor(bShow);
                bShow = !bShow;
            }, 600);
        }
        showCursor(true);
        _this.focused = true;
    };
    function showCursor(bShow) {
        _this.divCursor = $('#coolInputCursor');
        if (_this.divCursor.length === 0) {
            _this.divCursor = $('<div id="coolInputCursor" style="width:2px;z-index:99999;background-color:#000;position:fixed;display:none;"></div>');
            $(document.body).append(_this.divCursor);
           // var sz = {};
            //getTextWidth('3', sz);
            //var ht=sz.height+2;
        }
        var pad = 0;
        var cx = _this.inputEl.offset().left + _this.cursorX;
        var cy = _this.inputEl.offset().top;
        var ht = _this.inputEl.height();
        if (ht >= 40) pad = 8;
        else if (ht >= 30) pad = 3;
        _this.divCursor.height(ht-2*pad);
        _this.divCursor.css('left', cx + 'px');
        _this.divCursor.css('top', cy+pad + 'px');
         

        if (bShow) {
            _this.divCursor.show();
        }
        else {
            _this.divCursor.hide();
        }
    }
     
    input.onclick = _this.showPanel;
    document.addEventListener('click', function (evt) {
        if (!_this.focused) return; 
        //ignore the click on the panel
        if (evt.target.id === "coolInputPanel")
            return; 
        if (evt.target  === input)
            return; 
        var panelMum = $(evt.target).parents('#coolInputPanel');
        if (panelMum.length > 0) {
            return;
        }
        if (_this.divCursor && _this.divCursor.length > 0 && evt.target === _this.divCursor[0])
            return;
        var destIsInput = false;
        CoolInput.arrInputEl.every(function (el) {
            if (el === evt.target) {
                destIsInput = true;
                return false;
            }
            return true;
        });
        if (!destIsInput) {  
              
                if (_this.divCursor) {
                    _this.divCursor.hide();
                }
                if (_this.Panel) { 
                    _this.Panel.animate({ 'margin-bottom': '-200px' }, {
                        duration: 400, complete: function () {
                            _this.Panel.hide();
                        }
                    }); 
                } 
        }
        if (_this.tmCoolInput) {
            clearInterval(_this.tmCoolInput); _this.tmCoolInput = 0;
        }
        _this.focused = false;
    });
 
}
 