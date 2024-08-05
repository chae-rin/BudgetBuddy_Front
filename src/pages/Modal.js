import React, {useState, useEffect} from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import {useForm} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'

function Modal(props){
    const {onClose} = props;
    const {content} = props;



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
    function clickSaveBtn(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        // props.saveData(formData);
    }
    
    const {register, handleSubmit,formState:{errors}} = useForm({mode:"onBlur"});
    const onSubmit = (data) => {
        console.log("data", data);
        props.saveData(data);
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
                                                    <select name={item.name}
                                                            {...register(item.name,
                                                                { required: { value: item.required, message: item.label + "을 입력해주세요" } })}>
                                                        {item.option.map((opt) => (
                                                            <option value={opt.code_id} selected={item.value === opt.code_id}>{opt.code_name}</option>
                                                        ))}
                                                    </select>);
                                            case "date":
                                                return (
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DateTimePicker 
                                                            name={item.name}
                                                            value={dayjs(item.value)}
                                                            format="YYYY-MM-DD HH:mm:ss"
                                                            {...register(item.name,
                                                                { required: { value: item.required, message: item.label + "을 입력해주세요" } })}
                                                            />
                                                    </LocalizationProvider>
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
                        <button type="submit" className="w-btn w-btn-green2" style={{width:"100%",bottom:"0"}}>저장</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal;