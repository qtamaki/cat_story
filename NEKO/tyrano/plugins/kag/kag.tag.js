tyrano.plugin.kag.ftag={tyrano:null,kag:null,array_tag:[],master_tag:{},current_order_index:-1,init:function(){for(var order_type in tyrano.plugin.kag.tag){this.master_tag[order_type]=object(tyrano.plugin.kag.tag[order_type]);this.master_tag[order_type].kag=this.kag}},buildTag:function(array_tag,label_name){this.array_tag=array_tag;if(label_name)this.nextOrderWithLabel(label_name);else this.nextOrderWithLabel("")},buildTagIndex:function(array_tag,index,auto_next){this.array_tag=array_tag;this.nextOrderWithIndex(index,
undefined,undefined,undefined,auto_next)},completeTrans:function(){if(this.kag.stat.is_stop==true){this.kag.layer.showEventLayer();this.nextOrder()}},hideNextImg:function(){$(".img_next").remove();$("#glyph_image").hide()},nextOrder:function(){this.kag.layer.layer_event.hide();var that=this;if(this.kag.stat.is_strong_stop==true)return false;try{this.current_order_index++;if(this.array_tag.length<=this.current_order_index){this.kag.endStorage();return false}var tag=$.cloneObject(this.array_tag[this.current_order_index]);
this.kag.stat.current_line=tag.line;this.kag.log("**:"+this.current_order_index+"\u3000line:"+tag.line);this.kag.log(tag);if(this.kag.stat.flag_ref_page==true){this.kag.stat.flag_ref_page=false;this.kag.ftag.hideNextImg();this.kag.getMessageInnerLayer().html("")}if(this.checkCond(tag)!=true){this.nextOrder();return}if(this.kag.stat.is_hide_message==true){this.kag.layer.showMessageLayers();this.kag.stat.is_hide_message=false}if(this.master_tag[tag.name]){tag.pm=this.convertEntity(tag.pm);var err_str=
this.checkVital(tag);if(this.checkCw(tag))this.kag.layer.layer_event.show();if(err_str!="")this.kag.error(err_str);else this.master_tag[tag.name].start($.extend(true,$.cloneObject(this.master_tag[tag.name].pm),tag.pm))}else if(this.kag.stat.map_macro[tag.name]){tag.pm=this.convertEntity(tag.pm);var pms=tag.pm;var map_obj=this.kag.stat.map_macro[tag.name];var back_pm={};back_pm.index=this.kag.ftag.current_order_index;back_pm.storage=this.kag.stat.current_scenario;back_pm.pm=pms;this.kag.stat.mp=pms;
this.kag.pushStack("macro",back_pm);this.kag.ftag.nextOrderWithIndex(map_obj.index,map_obj.storage)}else{$.error_message("\u30bf\u30b0\uff1a["+tag.name+"]\u306f\u5b58\u5728\u3057\u307e\u305b\u3093");this.nextOrder()}}catch(e){console.log(e);that.kag.error("\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\u30b9\u30af\u30ea\u30d7\u30c8\u3092\u78ba\u8a8d\u3057\u3066\u4e0b\u3055\u3044")}},checkCw:function(tag){var master_tag=this.master_tag[tag.name];if(master_tag.cw)if(this.kag.stat.is_script!=
true&&this.kag.stat.is_html!=true&&this.kag.stat.checking_macro!=true)return true;else return false;else return false},nextOrderWithTag:function(target_tags){try{this.current_order_index++;var tag=this.array_tag[this.current_order_index];if(this.checkCond(tag)!=true);if(target_tags[tag.name]=="")if(this.master_tag[tag.name]){tag.pm=this.convertEntity(tag.pm);this.master_tag[tag.name].start($.extend(true,$.cloneObject(this.master_tag[tag.name].pm),tag.pm));return true}else return false;else return false}catch(e){console.log(this.array_tag);
return false}},convertEntity:function(pm){var that=this;if(pm["*"]=="")pm=$.extend(true,$.cloneObject(pm),this.kag.stat.mp);for(key in pm){var val=pm[key];var c="";if(val.length>0)c=val.substr(0,1);if(val.length>0&&c==="&")pm[key]=this.kag.embScript(val.substr(1,val.length));else if(val.length>0&&c==="%"){var map_obj=this.kag.getStack("macro");if(map_obj)pm[key]=map_obj.pm[val.substr(1,val.length)];var d=val.split("|");if(d.length==2)if(map_obj.pm[$.trim(d[0]).substr(1,$.trim(d[0]).length)])pm[key]=
map_obj.pm[$.trim(d[0]).substr(1,$.trim(d[0]).length)];else pm[key]=$.trim(d[1])}}return pm},checkVital:function(tag){var master_tag=this.master_tag[tag.name];var err_str="";if(master_tag.vital);else return"";var array_vital=master_tag.vital;for(var i=0;i<array_vital.length;i++)if(tag.pm[array_vital[i]]){if(tag.pm[array_vital[i]]=="")err_str+="\u30bf\u30b0\u300c"+tag.name+"\u300d\u306b\u30d1\u30e9\u30e1\u30fc\u30bf\u30fc\u300c"+array_vital[i]+"\u300d\u306f\u5fc5\u9808\u3067\u3059\u3000\n"}else err_str+=
"\u30bf\u30b0\u300c"+tag.name+"\u300d\u306b\u30d1\u30e9\u30e1\u30fc\u30bf\u30fc\u300c"+array_vital[i]+"\u300d\u306f\u5fc5\u9808\u3067\u3059\u3000\n";return err_str},checkCond:function(tag){var pm=tag.pm;if(pm.cond){var cond=pm.cond;return this.kag.embScript(cond)}else return true},startTag:function(name,pm){this.master_tag[name].start($.extend(true,$.cloneObject(this.master_tag[name].pm),pm))},nextOrderWithLabel:function(label_name,scenario_file){this.kag.stat.is_strong_stop=false;if(label_name==
"*savesnap"){var tmpsnap=this.kag.menu.snap;var co=tmpsnap.current_order_index;var cs=tmpsnap.stat.current_scenario;this.nextOrderWithIndex(co,cs,undefined,undefined,"snap");return}var that=this;var original_scenario=scenario_file;label_name=label_name||"";scenario_file=scenario_file||this.kag.stat.current_scenario;label_name=label_name.replace("*","");if(scenario_file!=this.kag.stat.current_scenario&&original_scenario!=null){this.kag.layer.hideEventLayer();this.kag.loadScenario(scenario_file,function(array_tag){that.kag.layer.showEventLayer();
that.kag.ftag.buildTag(array_tag,label_name)});return}if(label_name==""){this.current_order_index=-1;this.nextOrder()}else if(this.kag.stat.map_label[label_name]){var label_obj=this.kag.stat.map_label[label_name];this.current_order_index=label_obj.index;this.nextOrder()}else{$.error_message("\u30e9\u30d9\u30eb\u540d\uff1a\u300c"+label_name+"\u300d\u306f\u5b58\u5728\u3057\u307e\u305b\u3093");this.nextOrder()}},nextOrderWithIndex:function(index,scenario_file,flag,insert,auto_next){this.kag.stat.is_strong_stop=
false;this.kag.layer.showEventLayer();var that=this;flag=flag||false;auto_next=auto_next||"yes";scenario_file=scenario_file||this.kag.stat.current_scenario;if(scenario_file!=this.kag.stat.current_scenario||flag==true){this.kag.layer.hideEventLayer();this.kag.loadScenario(scenario_file,function(array_tag){if(typeof insert=="object")array_tag.splice(index+1,0,insert);that.kag.layer.showEventLayer();that.kag.ftag.buildTagIndex(array_tag,index,auto_next)});return}this.current_order_index=index;if(auto_next==
"yes")this.nextOrder();else if(auto_next=="snap"){this.kag.stat.is_strong_stop=this.kag.menu.snap.stat.is_strong_stop;if(this.kag.stat.is_skip==true&&this.kag.stat.is_strong_stop==false)this.kag.ftag.nextOrder()}else if(auto_next=="stop")this.kag.stat.is_strong_stop=true}};
tyrano.plugin.kag.tag.text={cw:true,pm:{"val":""},start:function(pm){if(this.kag.stat.is_script==true){this.kag.stat.buff_script+=pm.val+"\n";this.kag.ftag.nextOrder();return}if(this.kag.stat.is_html==true){this.kag.stat.map_html.buff_html+=pm.val;this.kag.ftag.nextOrder();return}var j_inner_message=this.kag.getMessageInnerLayer();j_inner_message.css("letter-spacing",this.kag.config.defaultPitch+"px").css("line-height",parseInt(this.kag.config.defaultFontSize)+parseInt(this.kag.config.defaultLineSpacing)+
"px").css("font-family",this.kag.config.userFace);this.kag.stat.current_message_str=pm.val;if(this.kag.stat.vertical=="true"){if(this.kag.config.defaultAutoReturn!="false"){var j_outer_message=this.kag.getMessageOuterLayer();var limit_width=parseInt(j_outer_message.css("width"))*0.8;var current_width=parseInt(j_inner_message.find("p").css("width"));if(current_width>limit_width)this.kag.getMessageInnerLayer().html("")}this.showMessageVertical(pm.val)}else{if(this.kag.config.defaultAutoReturn!="false"){var j_outer_message=
this.kag.getMessageOuterLayer();var limit_height=parseInt(j_outer_message.css("height"))*0.8;var current_height=parseInt(j_inner_message.find("p").css("height"));if(current_height>limit_height)this.kag.getMessageInnerLayer().html("")}this.showMessage(pm.val)}},showMessage:function(message_str){var that=this;this.kag.pushBackLog(message_str);that.kag.ftag.hideNextImg();(function(jtext){if(jtext.html()=="")jtext.append("<p class=''></p>");var _message_str=message_str;var current_str="";if(jtext.find("p").find(".current_span").length!=
0)current_str=jtext.find("p").find(".current_span").html();var index=0;that.kag.checkMessage(jtext);var j_span=that.kag.getMessageCurrentSpan();j_span.css("color",that.kag.stat.font.color).css("font-weight",that.kag.stat.font.bold).css("font-size",that.kag.stat.font.size+"px").css("font-family",that.kag.stat.font.face);var pchar=function(pchar){var c=_message_str.substring(index,++index);if(that.kag.stat.ruby_str!=""){c="<ruby><rb>"+c+"</rb><rt>"+that.kag.stat.ruby_str+"</rt></ruby>";that.kag.stat.ruby_str=
""}current_str+=c;that.kag.appendMessage(jtext,current_str);if(index<=_message_str.length){that.kag.stat.is_adding_text=true;if(that.kag.stat.is_click_text==true||that.kag.stat.is_skip==true||that.kag.stat.is_nowait==true)setTimeout(function(){pchar(pchar)},0);else setTimeout(function(){pchar(pchar)},that.kag.stat.ch_speed)}else{that.kag.stat.is_adding_text=false;that.kag.stat.is_click_text=false;if(that.kag.stat.is_stop!="true")that.kag.ftag.nextOrder();else;if(that.kag.stat.flag_glyph=="false"){$(".img_next").remove();
jtext.find("p").append("<img class='img_next' src='./tyrano/images/kag/nextpage.gif' />")}else $("#glyph_image").show()}};pchar(pchar)})(this.kag.getMessageInnerLayer())},showMessageVertical:function(message_str){var that=this;that.kag.ftag.hideNextImg();(function(jtext){if(jtext.html()=="")jtext.append("<p class='vertical_text'></p>");var _message_str=message_str;var current_str="";if(jtext.find("p").find(".current_span").length!=0)current_str=jtext.find("p").find(".current_span").html();var index=
0;that.kag.checkMessage(jtext);var j_span=that.kag.getMessageCurrentSpan();j_span.css("color",that.kag.stat.font.color).css("font-weight",that.kag.stat.font.bold).css("font-size",that.kag.stat.font.size+"px").css("font-family",that.kag.stat.font.face);var pchar=function(pchar){var c=_message_str.substring(index,++index);if(that.kag.stat.ruby_str!=""){c="<ruby><rb>"+c+"</rb><rt>"+that.kag.stat.ruby_str+"</rt></ruby>";that.kag.stat.ruby_str=""}current_str+=c;that.kag.appendMessage(jtext,current_str);
if(index<=_message_str.length){that.kag.stat.is_adding_text=true;if(that.kag.stat.is_click_text==true||that.kag.stat.is_skip==true)setTimeout(function(){pchar(pchar)},0);else setTimeout(function(){pchar(pchar)},that.kag.stat.ch_speed)}else{that.kag.stat.is_adding_text=false;that.kag.stat.is_click_text=false;that.kag.ftag.nextOrder();if(that.kag.stat.flag_glyph=="false"){$(".img_next").remove();jtext.find("p").append("<img class='img_next' src='./tyrano/images/kag/nextpage.gif' />")}else $("#glyph_image").show()}};
pchar(pchar)})(this.kag.getMessageInnerLayer())},nextOrder:function(){},test:function(){}};tyrano.plugin.kag.tag.label={pm:{},start:function(pm){if(this.kag.config.autoRecordPageShowing=="true"){var sf_str="sf.trail_"+this.kag.stat.current_scenario.replace(".ks","").replace(/\u002f/g,"").replace(/:/g,"").replace(/./g,"")+"_"+pm.label_name+"";var scr_str="";+sf_str+" = "+sf_str+"  || 0;"+sf_str+"++;";this.kag.evalScript(scr_str)}this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.l={cw:true,start:function(){if(this.kag.stat.is_skip==true)this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.p={cw:true,start:function(){this.kag.stat.flag_ref_page=true;if(this.kag.stat.is_skip==true)this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.graph={vital:["storage"],pm:{storage:null},start:function(pm){var jtext=this.kag.getMessageInnerLayer();var current_str="";if(jtext.find("p").find(".current_span").length!=0)current_str=jtext.find("p").find(".current_span").html();var storage_url="";if($.isHTTP(pm.storage))storage_url=pm.storage;else storage_url="./data/image/"+pm.storage;this.kag.appendMessage(jtext,current_str+"<img src='"+storage_url+"' >");this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.jump={pm:{storage:null,target:null,countpage:true},start:function(pm){this.kag.ftag.nextOrderWithLabel(pm.target,pm.storage)}};tyrano.plugin.kag.tag.r={start:function(){var j_inner_message=this.kag.getMessageInnerLayer();var txt=j_inner_message.find("p").find(".current_span").html()+"<br />";j_inner_message.find("p").find(".current_span").html(txt);this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.er={start:function(){this.kag.ftag.hideNextImg();this.kag.getMessageInnerLayer().html("");this.kag.ftag.startTag("resetfont")}};tyrano.plugin.kag.tag.cm={start:function(){this.kag.ftag.hideNextImg();this.kag.layer.clearMessageInnerLayerAll();this.kag.layer.getFreeLayer().html("").hide();this.kag.ftag.startTag("resetfont")}};
tyrano.plugin.kag.tag.ct={start:function(){this.kag.ftag.hideNextImg();this.kag.layer.clearMessageInnerLayerAll();this.kag.layer.getFreeLayer().html("").hide();this.kag.stat.current_layer="message0";this.kag.stat.current_page="fore";this.kag.ftag.startTag("resetfont")}};tyrano.plugin.kag.tag.current={pm:{layer:"",page:"fore"},start:function(pm){if(pm.layer=="")pm.layer=this.kag.stat.current_layer;this.kag.stat.current_layer=pm.layer;this.kag.stat.current_page=pm.page;this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.position={pm:{layer:"message0",page:"fore",left:"",top:"",width:"",height:"",color:"",opacity:"",vertical:"",frame:"",marginl:"0",margint:"0",marginr:"0",marginb:"0"},start:function(pm){var target_layer=this.kag.layer.getLayer(pm.layer,pm.page).find(".message_outer");var new_style={left:pm.left+"px",top:pm.top+"px",width:pm.width+"px",height:pm.height+"px","background-color":$.convertColor(pm.color)};if(pm.vertical=="true")this.kag.stat.vertical="true";else this.kag.stat.vertical=
"false";if(pm.frame=="none"){target_layer.css("opacity",$.convertOpacity(this.kag.config.frameOpacity));target_layer.css("background-image","");target_layer.css("background-color",$.convertColor(this.kag.config.frameColor))}else if(pm.frame!=""){var storage_url="";if($.isHTTP(pm.frame))storage_url=pm.frame;else storage_url="./data/image/"+pm.frame+"";target_layer.css("background-image","url("+storage_url+")");target_layer.css("background-repeat","no-repeat");target_layer.css("opacity",1);target_layer.css("background-color",
"")}if(pm.opacity!="")target_layer.css("opacity",$.convertOpacity(pm.opacity));this.kag.setStyles(target_layer,new_style);this.kag.layer.refMessageLayer();var layer_inner=this.kag.layer.getLayer(pm.layer,pm.page).find(".message_inner");var new_style_inner={};if(pm.marginl!="0")new_style_inner["padding-left"]=parseInt(pm.marginl)+"px";if(pm.margint!="0")new_style_inner["padding-top"]=parseInt(pm.margint)+"px";if(pm.marginr!="0")new_style_inner["width"]=parseInt(layer_inner.css("width"))-parseInt(pm.marginr)+
"px";if(pm.marginb!="0")new_style_inner["height"]=parseInt(layer_inner.css("height"))-parseInt(pm.marginb)+"px";this.kag.setStyles(layer_inner,new_style_inner);this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.image={pm:{"layer":"base","page":"fore","visible":"","top":"","left":"","x":"","y":"","width":"","height":"","pos":"","name":"","folder":""},start:function(pm){var strage_url="";var folder="";if(pm.layer!="base"){var layer_new_style={};if(pm.visible=="true"&&pm.page=="fore")layer_new_style.display="block";this.kag.setStyles(this.kag.layer.getLayer(pm.layer,pm.page),layer_new_style);if(pm.pos!="")switch(pm.pos){case "left":case "l":pm.left=this.kag.config["scPositionX.left"];
break;case "left_center":case "lc":pm.left=this.kag.config["scPositionX.left_center"];break;case "center":case "c":pm.left=this.kag.config["scPositionX.center"];break;case "right_center":case "rc":pm.left=this.kag.config["scPositionX.right_center"];break;case "right":case "r":pm.left=this.kag.config["scPositionX.right"];break}if(pm.folder!="")folder=pm.folder;else folder="fgimage";if($.isHTTP(pm.storage))strage_url=pm.storage;else strage_url="./data/"+folder+"/"+pm.storage;var img_obj=$("<img />");
img_obj.attr("src",strage_url);img_obj.css("position","absolute");img_obj.css("top",pm.top+"px");img_obj.css("left",pm.left+"px");if(pm.width!="")img_obj.css("width",pm.width+"px");if(pm.height!="")img_obj.css("height",pm.height+"px");if(pm.x!="")img_obj.css("left",pm.x+"px");if(pm.y!="")img_obj.css("top",pm.y+"px");$.setName(img_obj,pm.name);this.kag.layer.getLayer(pm.layer,pm.page).append(img_obj);this.kag.ftag.nextOrder()}else{if(pm.folder!="")folder=pm.folder;else folder="bgimage";if($.isHTTP(pm.storage))strage_url=
pm.storage;else strage_url="./data/"+folder+"/"+pm.storage;var new_style={"background-image":"url("+strage_url+")","display":"none"};if(pm.page==="fore")new_style.display="block";this.kag.setStyles(this.kag.layer.getLayer(pm.layer,pm.page),new_style);this.kag.ftag.nextOrder()}}};
tyrano.plugin.kag.tag.freeimage={vital:["layer"],pm:{layer:"",page:"fore"},start:function(pm){if(pm.layer!="base")this.kag.layer.getLayer(pm.layer,pm.page).empty();else this.kag.layer.getLayer(pm.layer,pm.page).css("background-image","");this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.ptext={vital:["layer","x","y"],pm:{"layer":"0","page":"fore","x":0,"y":0,"vertical":"false","text":"\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000","size":"","face":"","color":"","italic":"","bold":"","name":"","zindex":"9999","overwrite":"false"},start:function(pm){var that=this;var font_new_style={"color":pm.color,"font-weight":pm.bold,"font-style":pm.fontstyle,"font-size":pm.size+"px","font-family":that.kag.stat.font.face,"z-index":"999",
"text":""};var target_layer=this.kag.layer.getLayer(pm.layer,pm.page);if(pm.overwrite=="true"&&pm.name!="")if($("."+pm.name).size()>0){$("."+pm.name).html(pm.text);this.kag.ftag.nextOrder();return false}var tobj=$("<p></p>");tobj.css("position","absolute");tobj.css("top",pm.y+"px");tobj.css("left",pm.x+"px");tobj.css("width","100%");if(pm.vertical=="true")tobj.addClass("vertical_text");$.setName(tobj,pm.name);tobj.html(pm.text);this.kag.setStyles(tobj,font_new_style);target_layer.append(tobj);this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.backlay={pm:{layer:""},start:function(pm){this.kag.layer.backlay(pm.layer);this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.wt={start:function(pm){this.kag.layer.hideEventLayer()}};tyrano.plugin.kag.tag.wb={start:function(pm){this.kag.layer.hideEventLayer()}};
tyrano.plugin.kag.tag.link={pm:{target:null,storage:null},start:function(pm){var that=this;var j_span=this.kag.setMessageCurrentSpan();j_span.css("cursor","pointer");(function(){var _target=pm.target;var _storage=pm.storage;j_span.bind("click",function(e){that.kag.ftag.nextOrderWithLabel(_target,_storage);that.kag.layer.showEventLayer()});j_span.css("cursor","pointer")})();this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.endlink={start:function(pm){var j_span=this.kag.setMessageCurrentSpan();this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.s={start:function(){this.kag.stat.is_strong_stop=true;this.kag.layer.hideEventLayer()}};tyrano.plugin.kag.tag._s={vital:[],pm:{},start:function(pm){this.kag.stat.strong_stop_recover_index=this.kag.ftag.current_order_index;this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.wait={vital:["time"],pm:{time:0},start:function(pm){var that=this;this.kag.stat.is_strong_stop=true;this.kag.layer.hideEventLayer();setTimeout(function(){that.kag.stat.is_strong_stop=false;that.kag.layer.showEventLayer();that.kag.ftag.nextOrder()},pm.time)}};tyrano.plugin.kag.tag.hidemessage={start:function(){this.kag.stat.is_hide_message=true;this.kag.layer.hideMessageLayers();this.kag.layer.layer_event.show()}};
tyrano.plugin.kag.tag.quake={vital:["time"],pm:{count:5,time:300,timemode:"",hmax:null,vmax:10,wait:"true"},start:function(pm){var that=this;if(pm.hmax!=null)$("."+this.kag.define.BASE_DIV_NAME).effect("shake",{times:parseInt(pm.count),distance:parseInt(pm.hmax),direction:"left"},parseInt(pm.time),function(){if(pm.wait=="true")that.kag.ftag.nextOrder()});else if(pm.vmax>0)$("."+this.kag.define.BASE_DIV_NAME).effect("shake",{times:parseInt(pm.count),distance:parseInt(pm.vmax),direction:"up"},parseInt(pm.time),
function(){if(pm.wait=="true")that.kag.ftag.nextOrder()});if(pm.wait=="false")that.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.font={pm:{},start:function(pm){this.kag.setMessageCurrentSpan();var new_font={};if(pm.size)this.kag.stat.font.size=pm.size;if(pm.color)this.kag.stat.font.color=$.convertColor(pm.color);if(pm.bold)this.kag.stat.font.bold=$.convertBold(pm.bold);if(pm.face)this.kag.stat.font.face=pm.face;this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.deffont={pm:{},start:function(pm){var new_font={};if(pm.size)this.kag.stat.default_font.size=pm.size;if(pm.color)this.kag.stat.default_font.color=$.convertColor(pm.color);if(pm.bold)this.kag.stat.default_font.bold=$.convertBold(pm.bold);if(pm.face)this.kag.stat.default_font.face=pm.face;this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.delay={pm:{speed:""},start:function(pm){if(pm.speed!="")this.kag.stat.ch_speed=parseInt(pm.speed);this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.nowait={pm:{},start:function(pm){this.kag.stat.is_nowait=true;this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.endnowait={pm:{},start:function(pm){this.kag.stat.is_nowait=false;this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.resetfont={start:function(){var j_span=this.kag.setMessageCurrentSpan();this.kag.stat.font=$.extend(true,{},this.kag.stat.default_font);this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.layopt={vital:["layer"],pm:{layer:"",page:"fore",visible:"",left:"",top:"",opacity:"",autohide:false,index:10},start:function(pm){var that=this;if(pm.layer=="message"){pm.layer=this.kag.stat.current_layer;pm.page=this.kag.stat.current_page}var j_layer=this.kag.layer.getLayer(pm.layer,pm.page);if(pm.visible!="")if(pm.visible=="true"){if(pm.page=="fore")j_layer.css("display","");j_layer.attr("l_visible","true")}else{j_layer.css("display","none");j_layer.attr("l_visible","false")}if(pm.left!=
"")j_layer.css("left",parseInt(pm.left));if(pm.top!="")j_layer.css("top",parseInt(pm.top));if(pm.opacity!="")j_layer.css("opacity",$.convertOpacity(pm.opacity));this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag["ruby"]={vital:["text"],pm:{text:""},start:function(pm){var str=pm.text;this.kag.stat.ruby_str=str;this.kag.ftag.nextOrder()}};tyrano.plugin.kag.tag.cancelskip={start:function(pm){this.kag.stat.is_skip=false;this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.locate={pm:{x:null,y:null},start:function(pm){if(pm.x!=null)this.kag.stat.locate.x=pm.x;if(pm.y!=null)this.kag.stat.locate.y=pm.y;this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.button={pm:{graphic:"",storage:null,target:null,ext:"",name:"",x:"",y:"",width:"",height:"",fix:"false",savesnap:"false",folder:"image",exp:"",prevar:"",hint:"",clickse:"",enterse:"",leavese:"",clickimg:"",enterimg:"",role:""},start:function(pm){var that=this;var target_layer=null;if(pm.role!="")pm.fix="true";if(pm.fix=="false"){target_layer=this.kag.layer.getFreeLayer();target_layer.css("z-index",999999)}else target_layer=this.kag.layer.getLayer("fix");var storage_url="";if($.isHTTP(pm.graphic))storage_url=
pm.graphic;else storage_url="./data/"+pm.folder+"/"+pm.graphic;var j_button=$("<img />");j_button.attr("src",storage_url);j_button.css("position","absolute");j_button.css("cursor","pointer");j_button.css("z-index",99999999);if(pm.x=="")j_button.css("left",this.kag.stat.locate.x+"px");else j_button.css("left",pm.x+"px");if(pm.y=="")j_button.css("top",this.kag.stat.locate.y+"px");else j_button.css("top",pm.y+"px");if(pm.fix!="false")j_button.addClass("fixlayer");if(pm.width!="")j_button.css("width",
pm.width+"px");if(pm.height!="")j_button.css("height",pm.height+"px");if(pm.hint!="")j_button.attr({"title":pm.hint,"alt":pm.hint});$.setName(j_button,pm.name);(function(){var _target=pm.target;var _storage=pm.storage;var _pm=pm;var preexp=that.kag.embScript(pm.preexp);var button_clicked=false;j_button.hover(function(){if(_pm.enterse!="")that.kag.ftag.startTag("playse",{"storage":_pm.enterse,"stop":true});if(_pm.enterimg!=""){var enter_img_url="";if($.isHTTP(_pm.enterimg))enter_img_url=_pm.enterimg;
else enter_img_url="./data/"+_pm.folder+"/"+_pm.enterimg;$(this).attr("src",enter_img_url)}},function(){if(_pm.leavese!="")that.kag.ftag.startTag("playse",{"storage":_pm.leavese,"stop":true});if(_pm.enterimg!=""){var enter_img_url="";if($.isHTTP(_pm.graphic))enter_img_url=_pm.graphic;else enter_img_url="./data/"+_pm.folder+"/"+_pm.graphic;$(this).attr("src",enter_img_url)}});j_button.click(function(event){if(_pm.clickse!="")that.kag.ftag.startTag("playse",{"storage":_pm.clickse});if(_pm.clickimg!=
""){var click_img_url="";if($.isHTTP(_pm.clickimg))click_img_url=_pm.clickimg;else click_img_url="./data/"+_pm.folder+"/"+_pm.clickimg;j_button.attr("src",click_img_url)}if(button_clicked==true&&_pm.fix=="false")return false;if(that.kag.stat.is_strong_stop!=true&&_pm.fix=="false")return false;button_clicked=true;if(_pm.exp!="")that.kag.embScript(_pm.exp,preexp);if(_pm.savesnap=="true"){if(that.kag.stat.is_stop==true)return false;that.kag.menu.snapSave(that.kag.stat.current_message_str)}if(_pm.role!=
""){switch(_pm.role){case "save":that.kag.menu.displaySave();break;case "load":that.kag.menu.displayLoad();break;case "window":that.kag.layer.hideMessageLayers();break;break;case "title":if(!confirm("\u30bf\u30a4\u30c8\u30eb\u306b\u623b\u308a\u307e\u3059\u3002\u3088\u308d\u3057\u3044\u3067\u3059\u306d\uff1f"))return false;location.reload();break;case "menu":that.kag.ftag.startTag("showmenu",{});break;case "skip":that.kag.ftag.startTag("skipstart",{});break;case "backlog":that.kag.ftag.startTag("showlog",
{});break}event.stopPropagation();return false}that.kag.layer.showEventLayer();if(_pm.role==""&&_pm.fix=="true")that.kag.ftag.startTag("call",_pm);else that.kag.ftag.startTag("jump",_pm)})})();target_layer.append(j_button);if(pm.fix=="false")target_layer.show();this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.glink={pm:{color:"black",storage:null,target:null,name:"",text:"",x:"auto",y:"",clickse:"",width:"",height:"",size:30},start:function(pm){var that=this;var target_layer=null;target_layer=this.kag.layer.getFreeLayer();target_layer.css("z-index",999999);var j_button=$("<div class='button'>"+pm.text+"</div>");j_button.css("position","absolute");j_button.css("cursor","pointer");j_button.css("z-index",99999999);j_button.css("font-size",pm.size+"px");j_button.addClass(pm.color);if(pm.height!=
"")j_button.css("height",pm.height+"px");if(pm.width!="")j_button.css("width",pm.width+"px");if(pm.x=="auto"){var chara_cnt=target_layer.find(".tyrano_chara").length;var sc_width=parseInt(that.kag.config.scWidth);var center=Math.floor(parseInt(j_button.css("width"))/2);var base=Math.floor(sc_width/2);var first_left=base-center;j_button.css("left",first_left+"px")}else if(pm.x=="")j_button.css("left",this.kag.stat.locate.x+"px");else j_button.css("left",pm.x+"px");if(pm.y=="")j_button.css("top",this.kag.stat.locate.y+
"px");else j_button.css("top",pm.y+"px");$.setName(j_button,pm.name);(function(){var _target=pm.target;var _storage=pm.storage;var _pm=pm;var preexp=that.kag.embScript(pm.preexp);var button_clicked=false;j_button.click(function(){if(_pm.clickse!="")that.kag.ftag.startTag("playse",{"storage":_pm.clickse});if(that.kag.stat.is_strong_stop!=true)return false;button_clicked=true;if(_pm.exp!="")that.kag.embScript(_pm.exp,preexp);that.kag.layer.showEventLayer();that.kag.ftag.startTag("cm",{});that.kag.ftag.startTag("jump",
_pm)})})();target_layer.append(j_button);target_layer.show();this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.clickable={vital:["width","height"],pm:{width:"0",height:"0",x:"",y:"",border:"none",color:"",mouseopacity:"",opacity:"140",storage:null,target:null,name:""},start:function(pm){var that=this;var layer_free=this.kag.layer.getFreeLayer();layer_free.css("z-index",9999999);var j_button=$("<div />");j_button.css("position","absolute");j_button.css("cursor","pointer");j_button.css("top",this.kag.stat.locate.y+"px");j_button.css("left",this.kag.stat.locate.x+"px");j_button.css("width",
pm.width+"px");j_button.css("height",pm.height+"px");j_button.css("opacity",$.convertOpacity(pm.opacity));j_button.css("background-color",$.convertColor(pm.color));j_button.css("border",$.replaceAll(pm.border,":"," "));if(pm.x!="")j_button.css("left",parseInt(pm.x));if(pm.y!="")j_button.css("top",parseInt(pm.y));(function(){var _target=pm.target;var _storage=pm.storage;var _pm=pm;if(_pm.mouseopacity!=""){j_button.bind("mouseover",function(){j_button.css("opacity",$.convertOpacity(_pm.mouseopacity))});
j_button.bind("mouseout",function(){j_button.css("opacity",$.convertOpacity(_pm.opacity))})}j_button.click(function(){var is_s=function(obj){if(obj.kag.stat.is_strong_stop!=true)return false;return true}(that);if(is_s==false)return false;that.kag.ftag.startTag("cm",{});that.kag.layer.showEventLayer();that.kag.ftag.startTag("jump",_pm)})})();layer_free.append(j_button);layer_free.show();this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.glyph={pm:{line:"nextpage.gif",layer:"message0",fix:"false",left:0,top:0},start:function(pm){var that=this;$("#glyph_image").remove();if(pm.fix=="true"){var j_layer=this.kag.layer.getLayer(pm.layer);var j_next=$("<img id='glyph_image' />");j_next.attr("src","./tyrano/images/kag/"+pm.line);j_next.css("position","absolute");j_next.css("z-index",99999);j_next.css("top",pm.top+"px");j_next.css("left",pm.left+"px");j_next.css("display","none");j_layer.append(j_next);this.kag.stat.flag_glyph=
"true"}else this.kag.stat.flag_glyph="false";this.kag.ftag.nextOrder()}};
tyrano.plugin.kag.tag.trans={vital:["time"],pm:{layer:"base",method:"crossfade",children:true,time:1500},start:function(pm){this.kag.ftag.hideNextImg();var that=this;var comp_num=0;var layer_num=$.countObj(this.kag.layer.map_layer_fore);if(pm.children=="false")layer_num=0;for(key in this.kag.layer.map_layer_fore)if(pm.children==true||key===pm.layer)(function(){var _key=key;var layer_fore=that.kag.layer.map_layer_fore[_key];var layer_back=that.kag.layer.map_layer_back[_key];if(_key.indexOf("message")!=
-1&&layer_back.attr("l_visible")=="false"){comp_num++;that.kag.layer.forelay(_key)}else{$.trans(pm.method,layer_fore,parseInt(pm.time),"hide",function(){});layer_back.css("display","none");$.trans(pm.method,layer_back,parseInt(pm.time),"show",function(){comp_num++;that.kag.layer.forelay(_key);if(layer_num<=comp_num)that.kag.ftag.completeTrans();that.kag.ftag.hideNextImg()})}})();this.kag.ftag.nextOrder()}};
