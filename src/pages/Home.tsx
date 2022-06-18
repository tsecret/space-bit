import React, { useEffect, useState } from 'react'
import { approve, checkWalletAccounts, connectWallet } from '../contracts';

const Home = () => {
    const [wallet, setWallet] = useState<string>();
    const [connecting, setConnecting] = useState<boolean>(false);

    const loadWallet = async () => {
        const wallet = await checkWalletAccounts();
        setWallet(wallet)
        console.log(wallet)
    }

    useEffect(() => {
        loadWallet()
    }, [])
    

    const onWalletConnect = async () => {
        setConnecting(true);
        const wallet = await connectWallet();
        if (wallet) {
            await approve()
            console.log("appriov")
        }
    }



    return (
        <div style={{ backgroundImage: "url(../assets/space-wallpaper.png)" }}>
            <section>
                <div className="max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
                    <div className="max-w-xl mx-auto text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        BitSpace Marketplace
                        <strong className="font-extrabold text-primary sm:block">
                        Play games. Win skins
                        </strong>
                    </h1>

                    <p className="mt-4 sm:leading-relaxed sm:text-xl">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {
                            wallet ? 
                            <button disabled className="block px-12 py-3 text-sm rounded-md font-medium bg-green-600" onClick={onWalletConnect}>
                                Connected
                            </button> :
                            <button disabled={connecting} className="block px-12 py-3 text-sm rounded-md font-medium btn-primary" onClick={onWalletConnect}>
                                Connect wallet
                            </button> 
                        }

                        <a className="block px-12 py-3 text-sm rounded-md font-medium btn-outline" href="/marketplace">
                            Visit marketplace
                        </a>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;