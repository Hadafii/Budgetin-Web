import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import PageNav from '../components/PageNav';
import OverviewLaporanUang from '../components/LaporanKeuangan/OverviewLaporanUang';
import OverviewLaporanUangRechart from '../components/LaporanKeuangan/OverviewLaporanUangRechart';
import RecentActivity from '../components/RecentActivity';


function Testpage({ collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }) {
    return (
        <>
            <PageNav>
                <RecentActivity/>
            </PageNav>
        </>
    );
}

export default Testpage;
