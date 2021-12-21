import React from 'react';
import { ThemeProvider } from '@mui/material';
import classNames from 'classnames';
import './Page.css';
import logo from '../../assets/images/logo.png';
import { theme } from '../../utils/Constants';

interface IPage {
    children: React.ReactNode;
    title?: string;
    wrapperClassName?: string;
    className?: string;
}

const Page = ({ children, wrapperClassName = '', className }: IPage) => {
    return (
        <div className={classNames('page-container', wrapperClassName)} >
            <ThemeProvider theme={theme}>
                <img src={logo} className="logo" />

                <div className={classNames('content', className)}>
                    {children}
                </div>
            </ThemeProvider>
        </div>
    )
}

export default Page;