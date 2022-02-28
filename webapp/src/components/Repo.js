import React, { useState, useEffect } from 'react';
import { BiGitRepoForked } from 'react-icons/bi';
import { FaWikipediaW } from 'react-icons/fa';
import { AiOutlineIssuesClose } from 'react-icons/ai';
import Loader from 'react-loader-spinner';

const Repo = ({ name, found, last }) => {
    const [fetched, setFetched] = useState(false);
    const [metadata, setMetadata] = useState({
        owner: {
            avatar_url:
                'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
        },

        // info
        created_at: 'nan-',
        updated_at: 'nan-',
        language: 'nan',
        forks_count: 'nan',

        // icons
        fork: false,
        has_issues: false,
        has_wiki: false,
    });

    const fetchMetaData = async () => {
        const [user, repo] = name.split('/');

        const api = `https://api.github.com/repos/${user}/${repo}`;

        const res = await fetch(api, {
            headers: {
                Authorization: 'token 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',
            },
        });
        let data = await res.json();

        data = Object.entries(data)
            .filter(([_, v]) => v != null)
            .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

        setMetadata({ ...metadata, ...data });
        setFetched(true);
    };

    useEffect(() => {
        if (found & !fetched) {
            fetchMetaData();
        }
    }, [fetched]);

    return (
        <div>
            {found ? 
                fetched ? (
                <a
                    href={`https://www.github.com/${name}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className="Repo" style={{marginBottom: last ? 0 : 20}}>
                        <div className="image">
                            <img
                                src={metadata.owner.avatar_url}
                                alt="user_avatar"
                            />
                        </div>
                        <div className="content-container">
                            <div className="title">
                                <h3 className="name">{name}</h3>
                                <div className="icons">
                                    <div
                                        className="icon"
                                        style={{
                                            opacity: metadata.fork ? 1 : 0.2,
                                        }}
                                    >
                                        <BiGitRepoForked className="center" />
                                    </div>
                                    <div
                                        className="icon"
                                        style={{
                                            opacity: metadata.has_issues
                                                ? 1
                                                : 0.2,
                                        }}
                                    >
                                        <AiOutlineIssuesClose className="center" />
                                    </div>
                                    <div
                                        className="icon"
                                        style={{
                                            opacity: metadata.has_wiki
                                                ? 1
                                                : 0.2,
                                        }}
                                    >
                                        <FaWikipediaW className="center" />
                                    </div>
                                </div>
                            </div>
                            <div className="metadata-container">
                                <div className="info-container">
                                    <p className="metadata">
                                        {metadata.created_at.split('-')[0]}
                                    </p>
                                    <p className="info">created</p>
                                </div>
                                <div className="info-container">
                                    <p className="metadata">
                                        {metadata.updated_at.split('-')[0]}
                                    </p>
                                    <p className="info">last updated</p>
                                </div>
                                <div className="info-container">
                                    <p className="metadata">
                                        {metadata.language}
                                    </p>
                                    <p className="info">language</p>
                                </div>
                                <div className="info-container">
                                    <p className="metadata">
                                        {metadata.forks_count}
                                    </p>
                                    <p className="info">Forks Count</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            ) : <Loader 
                    type='ThreeDots' 
                    color="#FF00FF"
                    height={40}
                    width={40}
                    className='Repo'/>
                : (
                <div className="Repo" style={{border: 'none'}}>
                    <h3 className="repo_name">Could not find.</h3>
                </div>
            )}
        </div>
    );
};

export default Repo;
