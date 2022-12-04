import { Network } from "@ethersproject/networks";
import { BaseProvider } from "@ethersproject/providers";
import { Box, Container, Divider, Grid, Tab, Tabs, Typography, Button, TextField } from "@mui/material";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { AccountTransactions } from "../components/account/account-transactions";
import { MainLayout } from "../components/main-layout";
import { NETWORK_COIN_SYMBOL } from "../config";
import { useWeb3 } from "../hooks/use-web3";
import MarkdownIt from 'markdown-it';
import dynamic from "next/dynamic";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { WidgetProps } from '@worldcoin/id'
import { useSettings } from '../hooks/use-settings';
import Router from 'next/router'


const Account: NextPage = () => {
    const [verified, setVerified] = useState<boolean>(false);

    const { wallet, provider } = useWeb3();
    const { connect } = useWeb3();
    const { saveSettings, settings } = useSettings();

    const connectWallet = async () => {
        try {
            await connect();
            Router.push('/');
        } catch (e) {
            console.warn(e);
        }
    };

    useEffect(() => {
        
    }, [wallet, provider]);

    const WorldIDWidget = dynamic<WidgetProps>(
        () => import('@worldcoin/id').then((mod) => mod.WorldIDWidget),
        { ssr: false }
      )
    
    const widgetProps: WidgetProps = {
        actionId: "wid_staging_0791a24e6fc3be1e245d2446dd30bc85",
        signal: "user-login",
        enableTelemetry: true,
        appName: "Liria",
        signalDescription: "Login to Liria",
        theme: "light",
        debug: true, // Recommended **only** for development
        onSuccess: (result) => setVerified(true),
        onError: ({ code, detail }) => console.log({ code, detail }),
        onInitSuccess: () => console.log("Init successful"),
        onInitError: (error) => console.log("Error while initialization World ID", error),
    };

    const login = () => {
        
    }

    return (
        <>
            <Head>
                <title>
                    Liria: Freedom of Speech
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    minHeight: '100vh',
                }}
            >
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                    <Grid item container justifyContent="center">
                        <Grid item>
                            <Typography variant="h3">Login</Typography>
                            <Typography variant="h6">Verification you are a real person and connect your wallet</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="center">
                        <Grid item>
                        <WorldIDWidget {...widgetProps} />
                        </Grid>
                    </Grid>
                    <Grid item container justifyContent="center">
                        <Grid item>
                        
                    
                    <Button
                        size="large"
                        variant="contained"
                        disabled={!verified}
                        onClick={async () => {
                            
                            await connectWallet();
                            
                        }}
                        >
                            Login with Metamask
                        </Button>
                        </Grid>
                    </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

Account.getLayout = (page) => (
    <MainLayout>
        {page}
    </MainLayout>
);

export default Account;