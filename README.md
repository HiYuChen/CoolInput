# CoolInput

## A HTML software keyboard for number inputing on mobile device. By javascript and jQuery.

when dealing with h5 app, we face some problems:
1.We can not popup the software keyboard automaticly when a page has been loaded on ios
2.we can not popup a digit keyboard with dot digit( only 0-9)

So working with the operating system's software keyboard is a anoying thing.

Here I spent 1 day to work out a virtual software keyboard and virtual cursor which work together perfectly just like the orignal input works.   

## screen shot:
 ![image](https://github.com/HiYuChen/CoolInput/blob/master/intro.jpg)
 
## some codes

### HTML:
```html
 <div style="text-align:center;">
       <div>First: INPUT</div><br />
       <div>
       <input type="text" id="amount" v-model="amount" style="font-family:Arial; font-size:40px;font-weight:bold; width:90%;"  />
       </div><br />
       <div>Second: DIV</div><br />
       <div id="amount1" v-model="amount1" style="text-align:left;display:inline-block; font-family:Arial;letter-spacing:0px; width:90%;height:90px;border-style:solid;border-color:#ddd;border-width:1px;font-size:80px;font-weight:bold;"></div>
       <button id="btnSubmit" style="margin-top:30px;width:80%; height:40px;background-color:#0d8;color:#fff;border-color:transparent;font-weight:bold;font-size:18px;" >Submit</button>
    </div>
    

```
v-model="amount"  will be used to bound data and the input element

### Javascript code in same page:
```javascript
 
        var data = {};
        var coolInput = new CoolInput({ slt: '#amount', data: data }); 
        coolInput.showPanel();
        var coolInput1 = new CoolInput({ slt: '#amount1', data: data });
        $('#btnSubmit').on('click', function () {
            alert('the data you entered is amount:'+data.amount+' and amount1:'+data.amount1);
        });
```

 With the v-model You can use this component with vue or other similar component to bind the data to element
 
 Please run the demo.html for full test.
 
 I've tested in Chrome,Safari,Edge. But it does not support IE


