import ROUTES from '../../routes'
import styled from 'styled-components'
import { isMobile } from '../../utils'
import { FONT_SIZE } from '../../constants'
import Shield from '../../assets/shield.svg'
import { Trans, useTranslation } from 'react-i18next'
import OpenFlower from '../../assets/open-flower.svg'
import OpenHugFlower from '../../assets/open-hug-flower.svg'
import ClosedHugFlower from '../../assets/closed-hug-flower.svg'
import { Bold } from '../Text'

const OtherResources = () => {
    useTranslation()
    const mobile = isMobile()

    const onClickIPFSInterface = () => {
        window.open("https://github.com/ethereum/kzg-ceremony#ipfs-hosted-versions")
    }

    const onClickHostedInterface = () => {
        window.open(window.location.origin + '/#' + ROUTES.ENTROPY_INPUT)
    }

    const onClickOtherClients = () => {
        window.open("https://github.com/ethereum/kzg-ceremony#client-implementations")
    }

    const onClickWriteYourOwn = () => {
        window.open("https://blog.ethereum.org/2022/12/15/kzg-ceremony-grants-round")
    }


    return (
    <Row isMobile={mobile}>
        <Col disabled={mobile} onClick={onClickIPFSInterface} isMobile={mobile}>
        <InternalCol>
            <Link>
                { mobile ?
                    <Trans i18nKey="landing.button-mobile">Proceed on desktop</Trans>
                    :
                    <Trans i18nKey="otherResources.ipfs">IPFS</Trans>
                }
                { " " }
            </Link>
            <img src={ClosedHugFlower} alt="closed hug flower icon"/>
        </InternalCol>
        </Col>
        <Col disabled={mobile} onClick={onClickHostedInterface} isMobile={mobile}>
        <InternalCol>
            <Link>
                { mobile ?
                    <Trans i18nKey="landing.button-mobile">Proceed on desktop</Trans>
                    :
                    <Trans i18nKey="otherResources.hosted">Hosted Interface</Trans>
                }
                { " " }
            </Link>
            <img src={OpenFlower} alt="open flower icon"/>
            { mobile ?
                ''
                :
                <Bold >
                    <Trans i18nKey="otherResources.recommended">(Recommended)</Trans>
                </Bold>
            }
        </InternalCol>
        </Col>
        <Col onClick={onClickOtherClients} isMobile={mobile}>
        <InternalCol>
            <Link>
                <Trans i18nKey="otherResources.otherClients">
                    Other Clients
                </Trans>
                { " " }
            </Link>
            <img src={OpenHugFlower} alt="open hug flower icon"/>
        </InternalCol>
        </Col>
        <Col onClick={onClickWriteYourOwn} finalCol={true} isMobile={mobile}>
        <InternalCol>
            <Link>
                <Trans i18nKey="otherResources.writeYourOwn">
                    Write your Own!
                </Trans>
                { " " }
            </Link>
            <img src={Shield} alt="shield icon"/>
        </InternalCol>
        </Col>
    </Row>
    )
}

const Row = styled.div<{isMobile: boolean}>`
    display: flex;
    margin-block: 50px;
    ${({ isMobile }) => isMobile ?
        `overflow-x: scroll;
         width: 100%;`
        : 'width: 100%;'
    }
`

const InternalCol = styled.div`
    margin: 7px;
    padding-block: 10px;


    :hover:not([disabled]) {
        border: solid 1px ${({ theme }) => theme.loader};
    }
`

const Col = styled.button<{finalCol?: boolean, isMobile: boolean}>`
    flex: 3;
    width: 100%;
    height: ${({ isMobile }) => isMobile ? '190px' : '180px'};
    border: none;
    border-left: solid 1px ${({ theme }) => theme.loader};
    border-top: solid 1px ${({ theme }) => theme.loader};
    border-bottom: solid 1px ${({ theme }) => theme.loader};
    ${({ theme, finalCol }) =>
        finalCol ?
        'border-right: solid 1px' + theme.loader + ';'
        :
        ''
    }

    background: white;
    cursor: pointer;
    text-align: center;
    padding: 5px;

    :hover:not([disabled]) {
        z-index: 1;
        padding: 4px; /* -1px added from the border in InternalCol */
        box-shadow: 1px 2px 6px 6px #b4b2b2;
        border-right: solid 1px ${({ theme }) => theme.loader};
        background: ${({ theme }) => theme.surface}
    }
`

const Link = styled.div`
  text-decoration-line: underline;
  font-family: 'Inter', sans-serif;
  font-size: ${FONT_SIZE.SM};
  font-weight: 100;

  ::after {
    content: "↗";
    font-size: 0.875em;
  }
`

export default OtherResources