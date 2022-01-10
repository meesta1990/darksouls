import React from 'react';
import {CircularProgress, ThemeProvider} from '@mui/material';
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
    loading?: boolean;
}

const Page = ({
    children = null,
    wrapperClassName = '',
    className,
    disableLogo,
    loading
}: IPage) => {
    return (
        <div className={classNames('page-container', !disableLogo && 'page-container-with-logo', wrapperClassName)} >
            <ThemeProvider theme={theme}>
                {!disableLogo && <img src={logo} className="logo" />}



                <div className={classNames('content', className)}>


                    <div className="wrapper-loading-background">
                        {loading && <>
                            <div className="loading-background" />
                            <CircularProgress color="secondary" />
                        </>}
                        {children}
                    </div>

                </div>
            </ThemeProvider>
        </div>
    )
}

export default Page;
