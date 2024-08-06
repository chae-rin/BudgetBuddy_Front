import React, {useState, useEffect} from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import {useForm} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'

import flaticon from '../img/flaticon.png'

function Modal(props){
    const {onClose} = props;
    const {content} = props;
    const {mode} = props;

    console.log(mode);

    // 모달 배경 스크롤 막기
    useEffect(() => {
        document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);


    // 저장버튼 클릭
    const {register, handleSubmit,formState:{errors}} = useForm({mode:"onBlur"});
    const onSubmit = (data) => {
        props.saveData(data);
    }
    

    // 삭제버튼 클릭
    const deleteData = () => {
        props.deleteData();
    }

    return (
        <div className="modal">
            <div className="modal_popup">
                <div style={{width:"100%",height:"10%"}}>
                    <button className="transper btn" style={{fontSize:"20px"}} onClick={()=>onClose(false)}>X</button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} style={{width:"100%",height:"90%"}}>
                    <div style={{width:"100%",height:"90%",overflowY:"auto"}}>
                        
                        {content.map((item) => (
                            <div style={{display:"-webkit-inline-box", width:"100%"}}>
                                <div style={{width:"30%"}}>{item.label}</div>
                                <div style={{width:"70%"}}>
                                    {(() => {
                                        switch (item.element) {
                                            case "input":
                                                return <div>
                                                            <input 
                                                                name={item.name} 
                                                                defaultValue={item.value}
                                                                maxLength={item.maxLength}
                                                                {...register(item.name,
                                                                    { required: { value: item.required, message: item.label + "을 입력해주세요" } })}
                                                            />
                                                            <ErrorMessage
                                                                errors={errors}
                                                                name={item.name}
                                                                render={({ message }) => <p style={{color:"red", fontSize:"10px", margin:"0"}}>{message}</p>}
                                                            />
                                                        </div>
                                            case "select":
                                                return (
                                                    <div>
                                                        <select name={item.name}
                                                                {...register(item.name,
                                                                    { required: { value: item.required, message: item.label + "을 선택해주세요" } })}>
                                                            {item.option.map((opt) => (
                                                                <option value={opt.code_id} selected={item.value === opt.code_id}>{opt.code_name}</option>
                                                            ))}
                                                        </select>
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name={item.name}
                                                            render={({ message }) => <p style={{color:"red", fontSize:"10px", margin:"0"}}>{message}</p>}
                                                        />
                                                    </div>
                                                    );
                                            case "date":
                                                return (
                                                    <div>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DateTimePicker 
                                                                name={item.name}
                                                                value={dayjs(item.value)}
                                                                format="YYYY-MM-DD HH:mm:ss"
                                                                {...register(item.name,
                                                                    { required: { value: item.required, message: item.label + "을 입력해주세요" } })}
                                                            />
                                                        </LocalizationProvider>
                                                    </div>
                                                );    
                                            default:
                                                return null;
                                        }
                                    })()}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{width:"100%",height:"10%"}}>
                        {
                            mode == 'REG'
                            ? <button type="submit" className="w-btn w-btn-green2" style={{width:"100%",bottom:"0"}}>저장</button>
                            : <div style={{display:"flex"}}>
                                <div onClick={deleteData} className="w-btn deleteBtn" style={{border:"solid 1px"}}></div>
                                <button type="submit" className="w-btn w-btn-green2" style={{width:"100%",bottom:"0"}}>저장</button>
                              </div>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal;