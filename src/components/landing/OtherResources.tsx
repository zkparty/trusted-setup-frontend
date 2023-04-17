import styled from 'styled-components'
import { isMobile } from '../../utils'
import { FONT_SIZE } from '../../constants'
import Shield from '../../assets/shield.svg'
import { Trans, useTranslation } from 'react-i18next'
import OpenHugFlower from '../../assets/open-hug-flower.svg'
import ClosedHugFlower from '../../assets/closed-hug-flower.svg'

const OtherResources = () => {
    useTranslation()
    const mobile = isMobile()

    const onClickIPFSInterface = () => {
        window.open("https://latest.kzgceremony.eth")
    }

    const onClickOtherClients = () => {
        window.open("https://github.com/ethereum/kzg-ceremony#client-implementations")
    }


    return (
    <Row isMobile={mobile}>
        <Col disabled={mobile} onClick={onClickIPFSInterface}>
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
        <Col onClick={onClickOtherClients}>
        <InternalCol>
            <Link>
                <Trans i18nKey="otherResources.otherClients">
                    CLI Clients
                </Trans>
                { " " }
            </Link>
            <img src={OpenHugFlower} alt="open hug flower icon"/>
        </InternalCol>
        </Col>
    </Row>
    )
}

const Row = styled.div<{isMobile: boolean}>`
    display: flex;
    margin-top: 20px;
    margin-bottom: 10px;
    ${({ isMobile }) => isMobile ?
        `overflow-x: scroll;
         width: 100%;`
        : 'width: 100%;'
    }
`

const InternalCol = styled.div`
    margin: 7px;
    padding-block: 5px;
    height: auto;


    :hover:not([disabled]) {
        border: solid 1px ${({ theme }) => theme.loader};
    }
`

const Col = styled.button`
    flex: 4;
    width: 100%;
    height: auto;
    border: none;
    background: transparent;
    cursor: pointer;
    text-align: center;
    padding: 5px;

    :hover:not([disabled]) {
        z-index: 1;
        padding: 4px; /* -1px added from the border in InternalCol */
        box-shadow: 1px 2px 6px 6px #b4b2b2;
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