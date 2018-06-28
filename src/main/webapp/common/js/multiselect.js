$(document).ready(function() {
    // make code pretty
    window.prettyPrint && prettyPrint();

    $('#search').multiselect({
        search: {
            left: '<input type="text" name="q" class="form-control" placeholder="Search..." />',
            right: '<input type="text" name="q" class="form-control" placeholder="Search..." />',
        },
        fireSearch: function(value) {
            return value.length > 3;
        }
    });
    
//     $('#multiModal').modal('show');
});

/**
 * @param urlSelPath 已选择路径
 * @param urlUnSelPath 未选择路径
 * @param mSavePath 保存路径
 * @param mTranData 传输数据
 * @param mFdMultiId 当前选择数据Id
 */
function openMulti(urlSelPath,urlUnSelPath,mSavePath,mTranData,mFdMultiId){
	reLoadData(urlSelPath,urlUnSelPath,mTranData);
	$('#fdMultiId').val(mFdMultiId);
	$('#hidMultiSave').val(mSavePath);
	
	$('#multiModal').modal('show');
}

function reLoadData(urlSelPath,urlUnSelPath,mTranData) {
	$.ajax({
		url:urlSelPath,
		type:'post',
		data:mTranData,
		dataType:'json',
		async:false,
		success:function(data){
			loadSelJson(data);
		},
		error:function(xhr,textStatus){
		
		}
	});
	
	$.ajax({
		url:urlUnSelPath,
		type:'post',
		data:mTranData,
		dataType:'json',
		async:false,
		success:function(data){
			loadUnSelJson(data);
		},
		error:function(xhr,textStatus){
		
		}
	});
}

/**
 * 拼装已选择数据
 * @param tData
 */
function loadSelJson(tData){
	$('#search_to').html("");
	for(var i = 0;i<tData.length;i++){
		for(var j in tData[i]){
			if(j =="fd_name"){
				var ele = $("<option value='"+tData[i]["fd_id"]+"'>"+tData[i][j]+"</option>");
				$("#search_to").append(ele);
			}
		}
	}
}

/**
 * 拼装未选择数据
 * @param tData
 */
function loadUnSelJson(tData){
	$('#search').html("");
	for(var i = 0;i<tData.length;i++){
		for(var j in tData[i]){
			if(j =="fd_name"){
				var ele = $("<option value='"+tData[i]["fd_id"]+"'>"+tData[i][j]+"</option>");
				$("#search").append(ele);
			}
		}
	}
}

function saveData() {
	var mSavePath = $('#hidMultiSave').val();
	var fdMultiId = $('#fdMultiId').val();
	var fdSelObjIds = "";
	
	$("#search_to option").each(function(){  //遍历所有option  
        var txt = $(this).val();   //获取option值   
        if(txt!=''){  
        	fdSelObjIds += txt+";";
        }
   });
	
	$.ajax({
		type : "post",
		async:false,
		dataType:'json',
		url : mSavePath,
		data:JSON.stringify({'fdSelObjIds':fdSelObjIds, 'fdMultiId': fdMultiId}),
		contentType:'application/json',
		success : function(data) {
			var tData = data;
			var flag = tData.flag;
			if (flag == 'success') {
				bootbox.alert({ 
				  size: "small",
				  title: "信息提示：",
				  message: tData.msg
				});
			} else {
				bootbox.alert({ 
				  size: "small",
				  title: "错误提示：",
				  message: tData.msg
				});
			}
		}
	});
}