import React from 'react';
import { ThemeProvider } from '@mui/material';
import classNames from 'classnames';
import './Page.css';
import logo from '../../assets/images/logo.png';
import { theme } from '../../utils/Constants';

interface IPage {
    children?: React.ReactNode;
    title?: string;
    wrapperClassName?: string;
    className?: string;
    disableLogo?: boolean;
}

const Page = ({
    children = null,
    wrapperClassName = '',
    className,
    disableLogo
}: IPage) => {
    return (
        <div className={classNames('page-container', !disableLogo && 'page-container-with-logo', wrapperClassName)} >
            <ThemeProvider theme={theme}>
                {!disableLogo && <img src={logo} className="logo" />}

                <div className={classNames('content', className)}>
                    {children}
                </div>
            </ThemeProvider>
        </div>
    )
}

export default Page;
