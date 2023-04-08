import $axios from '../utils/request';

// gateway模块 
export const $gatewayList = (params)=> {
    return $axios.get('/gateway/list',{params});
}
export const $gatewayAdd = (data={})=> {
    return $axios.post('/gateway/add',data);
}
export const $gatewayDel = (data={})=> {
    return $axios.post('/gateway/del',data);
}
export const $gatewayEdit = (data={})=> {
    return $axios.post('/gateway/edit',data);
}

// account模块
export const $accountAdd = (data)=> {
    return $axios.post('/account/add',data);
}
export const $accountList = ()=> {
    return $axios.get('/account/list');
}
export const $accountLogin = (params)=> {
    return $axios.post('/account/login',params);
}
export const $accountDel = (data={})=> {
    return $axios.post('/account/del',data);
}
export const $accountEdit = (data={})=> {
    return $axios.post('/account/edit',data);
}

// security模块
export const $securityAdd = (data)=> {
    return $axios.post('/security/add',data);
}
export const $securityList = ()=> {
    return $axios.get('/security/list');
} 
export const $securityDel = (data={})=> {
    return $axios.post('/security/del',data);
}
export const $securityEdit = (data={})=> {
    return $axios.post('/security/edit',data);
}

// security模块
export const $measurementAdd = (data)=> {
    return $axios.post('/measurement/add',data);
}
export const $measurementList = ()=> {
    return $axios.get('/measurement/list');
} 
export const $measurementDel = (data={})=> {
    return $axios.post('/measurement/del',data);
}
export const $measurementEdit = (data={})=> {
    return $axios.post('/measurement/edit',data);
}


// sensor模块
export const $sensorAdd = (data)=> {
    return $axios.post('/sensor/add',data);
}
export const $sensorList = (params)=> {
    return $axios.get('/sensor/list',{params}); 
}
export const $sensorDel = (data={})=> {
    return $axios.post('/sensor/del',data);
}
export const $sensorCount = ()=> {
    return $axios.get('/sensor/count');
}
export const $sensorChangGroup = (params)=> {
    return $axios.get('/sensor/changeGroup',{params});
}

// group模块
export const $groupAdd = (data={})=> {
    return $axios.post('/group/add',data);
}
export const $groupDel = (data={})=> {
    return $axios.post('/group/del',data);
}
export const $groupEdit = (data={})=> {
    return $axios.post('/group/edit',data);
}
export const $groupList = (params={})=> {
    return $axios.get('/group/list',{params});
}

// device设备
export const $deviceCount = ()=> {
    return $axios.get('/device/count');
}
export const $deviceSensorList = ()=> {
    return $axios.get('/device/sensorList');
}  

// demo模块
export const $demoAdd = (data={})=> {
    return $axios.post('/demo/add',data);
}
export const $demoDel = (data={})=> {
    return $axios.post('/demo/del',data);
}
export const $demoEdit = (data={})=> {
    return $axios.post('/demo/edit',data);
}
export const $demoList = (params={})=> {
    return $axios.get('/demo/list',{params});
}

// 计费模块
export const $feeAdd = (data={})=> {
    return $axios.post('/fee/recharge',data); // 充值
}
export const $feeDel = (data={})=> {
    return $axios.post('/fee/del',data);
}
export const $feeEdit = (data={})=> {
    return $axios.post('/fee/edit',data);
}
export const $feeBalance= (params={})=> {
    return $axios.get('/fee/balance',{params});
}
export const $feeRechargeList = (params={})=> {
    return $axios.get('/fee/rechargeList',{params}); // 充值记录
}
export const $feeUsageList = (params={})=> {
    return $axios.get('/fee/usageList',{params}); // 使用记录
}

