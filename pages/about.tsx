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
import dynamic from "next/dynamic";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { WidgetProps } from '@worldcoin/id'


const Account: NextPage = () => {

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
                    <Grid container justifyContent="center" direction="column">
                        <Typography variant="h3">Liria</Typography>

                        <Typography variant="h5">
                            A privacy preserving community driven publication/whistle blowing platform to empower authors and readers.
                        </Typography>
                        <Typography variant="h5">
                            <ul>
                                <li>Human Centric: Bot free and sybil resistant platform where onboarding  is done to one real person one time only. </li>
                                <li>Privacy: Authors could get donations for their work in a fully anonymous way</li>
                                <li>Community: Community could express sentiment on the news/article and authors could be rewarded from the platfrom.</li>
                            </ul>
                        </Typography>
                        <Typography variant="h5">
                            Platform powered by the native token - LIRIA aka $LRA
                        </Typography>
                        
                    </Grid>
                    
                    {/* <Button
                            size="large"
                            variant="contained"
                            onClick={async () => {
                                // console.log(title, content?.html, wallet?.address)
                                // const walletAddress = wallet?.address ? wallet.address : '';
                                // const res = await storeNFT(title, content?.html, walletAddress)
                                // console.log(res)
                                // storeNFT(title, content, wallet)
                            }}
                        >
                            Signup
                        </Button> */}
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