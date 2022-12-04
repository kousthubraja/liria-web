import { Network } from "@ethersproject/networks";
import { BaseProvider } from "@ethersproject/providers";
import { Box, Container, Divider, Grid, Tab, Tabs, Typography, Button, TextField, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useEffect, useState } from "react";
import { AccountTransactions } from "../components/account/account-transactions";
import { MainLayout } from "../components/main-layout";
import { NETWORK_COIN_SYMBOL } from "../config";
import { useWeb3 } from "../hooks/use-web3";
// import MarkdownIt from 'markdown-it';
const MarkdownIt = require('markdown-it');
import { Chat } from "@pushprotocol/uiweb";

import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { storeNFT } from "../utility/storage";
import { Post, PostFromChain } from "../types/my-wallet";
import axios from "axios";
import ReactMarkdown from 'react-markdown'
import { getPosts as getPostsFromChain, scorePost } from "../utility/blockchain";
import { LoadingButton } from "@mui/lab";


const tabs = [
    { label: 'Transactions', value: 'transactions' },
];

const Account: NextPage = () => {
    const [posts, setPosts] = useState<Array<Post>>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [donateDetails, setDonateDetails] = useState<any>({});

    const { wallet, provider } = useWeb3();

    const loadPosts = async () => {
        const articles = await getPostsFromChain();
        console.log('articles', articles)

        const postFromChain: Array<PostFromChain> = articles.map((a: any, index: number) => {
            return {
                "articleId": index,
                "cid": a["cid"],
                "author": a["author"],
                "validityScore": a["validityScore"].toString(),
            }
        })
        
        Promise.all(
            postFromChain.map(async (element) => {
                const response = await axios(`https://gateway.pinata.cloud/ipfs/${element.cid}`);
                const json =  await response.data;
                return {
                    articleId: element.articleId,
                    cid: element.cid,
                    author: element.author,
                    validityScore: element.validityScore,
                    content: json['content'],
                    title: json['title']
                };
            })
        ).then((data) => {
            setPosts(data);
            setLoaded(true);
        });
    }

    useEffect(() => {
        // const postFromChain: Array<PostFromChain> = [
        //     {
        //         "cid": "QmV1pDbJfthgx3jPmwHPXY9uT8EA1LB7Mwy71c4dbWJW32",
        //         "creator": "0x2e50d66f02AC0d0503812b1f000a616b89A2fd91",
        //         "validityScore": 23
        //     },
        //     {
        //         "cid": "QmXB3ZLqxmmoupQxjkkEYqNMbhkdNPRLxzLXHYtqabv6Eb",
        //         "creator": "0x2e50d66f02AC0d0503812b1f000a616b89A2fd91",
        //         "validityScore": 23
        //     },
        // ];
        loadPosts()
        
        // console.log(parsedPosts)
    }, []);

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const renderers = {
        //This custom renderer changes how images are rendered
        //we use it to constrain the max width of an image to its container
        image: ({
            alt,
            src,
            title,
        }: {
            alt?: string;
            src?: string;
            title?: string;
        }) => (
            <img 
                alt={alt} 
                src={src} 
                title={title} 
                style={{ maxWidth: 475 }}  />
        ),
    };

    return (
        <>
            <Head>
                <title>
                    Liria: The Free Speech Network
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
                    {/* <Typography>Articles</Typography> */}
                    {/* <Divider sx={{ mb: 3 }} /> */}
                    {
                        posts.map((post) => <Box key={post.cid} style={{width: '100%'}}>
                            <Paper style={{padding: '20px', margin: '10px'}}>
                            <Typography variant="h4">{post.title}</Typography>
                            <Typography>{post.author}</Typography>
                            <div style={{width: '50vw', fontSize: 14}}>
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                            </div>
                            <Grid container spacing={2} alignItems="center" justifyContent="center">
                                <Grid item>
                                    <Typography variant="subtitle1">{post.validityScore < 0 ? '🥶' : '🔥'} {post.validityScore}</Typography>
                                </Grid>
                                <Grid item>
                                    <LoadingButton loading={buttonLoading} size="small" variant="contained" onClick={async () => {
                                        setButtonLoading(true)
                                        await scorePost(post.articleId, true)
                                        await loadPosts()
                                        setButtonLoading(false)
                                    }}>🔥 Approve</LoadingButton>
                                </Grid>
                                <Grid item>
                                    <LoadingButton loading={buttonLoading} size="small" variant="outlined" onClick={async () => {
                                        setButtonLoading(true)
                                        await scorePost(post.articleId, false)
                                        await loadPosts()
                                        setButtonLoading(false)
                                    }}>🥶 Disapprove</LoadingButton>
                                </Grid>
                                <Grid item>
                                    <LoadingButton loading={buttonLoading} size="small" variant="outlined" onClick={async () => {
                                        // setButtonLoading(true)
                                        // await scorePost(post.articleId, false)
                                        // await loadPosts()
                                        // setButtonLoading(false)
                                    }}>💬 Chat</LoadingButton>
                                </Grid>
                                <Grid item>
                                    <LoadingButton loading={buttonLoading} size="small" variant="outlined" onClick={async () => {
                                        console.log({
                                            reciever: post,
                                        })
                                        setDonateDetails({
                                            reciever: post,
                                        })
                                        // setButtonLoading(true)
                                        // await scorePost(post.articleId, false)
                                        // await loadPosts()
                                        // setButtonLoading(false)
                                    }}>💸 Donate</LoadingButton>
                                </Grid>
                            </Grid>
                            
                            </Paper>
                            <Divider sx={{ mb: 3 }} />
                        </Box>)
                    }
                    <Divider sx={{ mb: 3 }} />
                </Container>
                <Chat
                account="0x2e50d66f02AC0d0503812b1f000a616b89A2fd91" //user address
                supportAddress="0x537311ffc67Ba9BA65a32BDaa30529D52eB6B69E" //support address
                apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
                    env="staging"
                />
            </Box>
            <Backdrop
                // sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={!loaded}
                // onClick={handleClose}
                >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Dialog open={donateDetails['reciever'] !== undefined} onClose={() => setDonateDetails({})}>
                <DialogTitle>Donate</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To donate anonymously, enter the recipient's zkBob address and amount.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="recipient_address"
                    label="zkBob API Key"
                    disabled
                    value="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
                    type="recipient_address"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="recipient_address"
                    label="Recipient Address"
                    type="recipient_address"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="amount"
                    label="Amount"
                    type="number"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setDonateDetails({})}>Cancel</Button>
                <Button onClick={() => {}}>Donate</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

Account.getLayout = (page) => (
    <MainLayout>
        {page}
    </MainLayout>
);

export default Account;