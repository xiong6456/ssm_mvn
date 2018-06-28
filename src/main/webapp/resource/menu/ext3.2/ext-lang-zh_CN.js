
Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">������...</div>';

if(Ext.View){Ext.View.prototype.emptyText = "";}

if(Ext.grid.Grid){ Ext.grid.Grid.prototype.ddText = "{0} ѡ����";}

if(Ext.TabPanelItem){ Ext.TabPanelItem.prototype.closeText = "�ر�";}

if(Ext.form.Field){Ext.form.Field.prototype.invalidText = "����ֵ�Ƿ�";}

Date.monthNames = [ "һ��","����","����","����","����","����","����","����", "����","ʮ��","ʮһ��", "ʮ����"];

Date.dayNames = [ "��","һ", "��","��","��","��","��"];

if(Ext.Msg){Ext.Msg.buttonText = {ok:"ȷ��",cancel:"ȡ��",yes: "��",no: "��"};}

if(Ext.util.Format){
   Ext.util.Format.date = function(v, format){
      if(!v) return "";
      if(!(v instanceof Date)) v = new Date(Date.parse(v));
      return v.dateFormat(format || "y��m��d��");
   };
}

if(Ext.DatePicker){
   Ext.apply(Ext.DatePicker.prototype, {
      todayText         : "����",
      minText           : "��������С����֮ǰ",
      maxText           : "�������������֮��",
      disabledDaysText  : "",
      disabledDatesText : "",
      monthNames	: Date.monthNames,
      dayNames		: Date.dayNames,      
      nextText          : '���� (Control+Right)',
      prevText          : '���� (Control+Left)',
      monthYearText     : 'ѡ��һ���� (Control+Up/Down ���ı���)',
      todayTip          : "{0} (Spacebar)",
      format            : "y��m��d��"
   });
}

if(Ext.PagingToolbar){
   Ext.apply(Ext.PagingToolbar.prototype, {
      beforePageText : "ҳ",
      afterPageText  : "of {0}",
      firstText      : "��һҳ",
      prevText       : "ǰһҳ",
      nextText       : "��һҳ",
      lastText       : "���ҳ",
      refreshText    : "ˢ��",
      displayMsg     : "��ʾ {0} - {1} of {2}",
      emptyMsg       : 'û��������Ҫ��ʾ'
   });
}

if(Ext.form.TextField){
   Ext.apply(Ext.form.TextField.prototype, {
      minLengthText : "�����������С������ {0}",
      maxLengthText : "�����������󳤶��� {0}",
      blankText     : "��������Ϊ������",
      regexText     : "",
      emptyText     : null
   });
}

if(Ext.form.NumberField){
   Ext.apply(Ext.form.NumberField.prototype, {
      minText : "�����������Сֵ�� {0}",
      maxText : "������������ֵ�� {0}",
      nanText : "{0} ������Ч��ֵ"
   });
}

if(Ext.form.DateField){
   Ext.apply(Ext.form.DateField.prototype, {
      disabledDaysText  : "����",
      disabledDatesText : "����",
      minText           : "������������ڱ����� {0} ֮��",
      maxText           : "������������ڱ����� {0} ֮ǰ",
      invalidText       : "{0} ����Ч������ - ������ϸ�ʽ�� {1}",
      format            : "y��m��d��"
   });
}

if(Ext.form.ComboBox){
   Ext.apply(Ext.form.ComboBox.prototype, {
      loadingText       : "����...",
      valueNotFoundText : undefined
   });
}

if(Ext.form.VTypes){
   Ext.apply(Ext.form.VTypes, {
      emailText    : '������������ǵ����ʼ���ַ����ʽ�磺 "user@domain.com"',
      urlText      : '�������������URL��ַ����ʽ�磺 "http:/'+'/www.domain.com"',
      alphaText    : '��������ֻ�ܰ����ַ���_',
      alphanumText : '��������ֻ�ܰ����ַ�,���ֺ�_'
   });
}

if(Ext.grid.GridView){
   Ext.apply(Ext.grid.GridView.prototype, {
      sortAscText  : "����",
      sortDescText : "����",
      lockText     : "����",
      unlockText   : "������",
      columnsText  : "��"
   });
}

if(Ext.grid.PropertyColumnModel){
   Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
      nameText   : "����",
      valueText  : "ֵ",
      dateFormat : "y��m��d��"
   });
}

if(Ext.SplitLayoutRegion){
   Ext.apply(Ext.SplitLayoutRegion.prototype, {
      splitTip            : "�϶����ı�ߴ�.",
      collapsibleSplitTip : "�϶����ı�ߴ�. ˫������."
   });
}

//��������֧��
if(Ext.data.Store){  
   Ext.data.Store.prototype.applySort = function(){        //���� applySort   
          if(this.sortInfo && !this.remoteSort){   
             var s = this.sortInfo, f = s.field;   
  	     var st = this.fields.get(f).sortType;   
             var fn = function(r1, r2){   
             var v1 = st(r1.data[f]), v2 = st(r2.data[f]);   
 	    // ���:�޸����������쳣��Bug   
	    if(typeof(v1) == "string"){ //��Ϊ�ַ�����   
                return v1.localeCompare(v2);//���� localeCompare �ȽϺ����ַ���, Firefox �� IE ��֧��   
             }   
  
             // ��ӽ���   
             return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);   
             };   
              this.data.sort(s.direction, fn);   
              if(this.snapshot && this.snapshot != this.data){   
                  this.snapshot.sort(s.direction, fn);   
                }   
             }   
        };  
} 
