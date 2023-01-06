import ROUTES from '../../routes'
import styled from 'styled-components'
import { isMobile } from '../../utils'
import { FONT_SIZE } from '../../constants'
import Shield from '../../assets/shield.svg'
import { useNavigate } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import OpenFlower from '../../assets/open-flower.svg'
import OpenHugFlower from '../../assets/open-hug-flower.svg'
import ClosedHugFlower from '../../assets/closed-hug-flower.svg'

const OtherResources = () => {
    useTranslation()
    const navigate = useNavigate()
    const mobile = isMobile()

    const onClickIPFSInterface = () => {
        window.open("https://github.com/ethereum/kzg-ceremony#ipfs-hosted-versions")
    }

    const onClickHostedInterface = () => {
        navigate(ROUTES.ENTROPY_INPUT)
    }

    const onClickOtherClients = () => {
        window.open("https://github.com/ethereum/kzg-ceremony#client-implementations")
    }

    const onClickWriteYourOwn = () => {
        window.open("https://blog.ethereum.org/2022/12/15/kzg-ceremony-grants-round")
    }


    return (
    <Row isMobile={mobile}>
        <Col initialCol={true} disabled={mobile} onClick={onClickIPFSInterface}>
            <Link>
                { mobile ?
                    <Trans i18nKey="landing.button-mobile">Proceed on desktop</Trans>
                    :
                    <Trans i18nKey="otherResources.ipfs">IPFS</Trans>
                }
                { " " }
            </Link>
            <img src={ClosedHugFlower} alt="closed hug flower icon"/>
        </Col>
        <Col disabled={mobile} onClick={onClickHostedInterface}>
            <Link>
                { mobile ?
                    <Trans i18nKey="landing.button-mobile">Proceed on desktop</Trans>
                    :
                    <Trans i18nKey="otherResources.hosted">Hosted Interface</Trans>
                }
                { " " }
            </Link>
            <img src={OpenFlower} alt="open flower icon"/>
        </Col>
        <Col onClick={onClickOtherClients}>
            <Link>
                <Trans i18nKey="otherResources.otherClients">
                    Other Clients
                </Trans>
                { " " }
            </Link>
            <img src={OpenHugFlower} alt="open hug flower icon"/>
        </Col>
        <Col onClick={onClickWriteYourOwn} finalCol={true}>
            <Link>
                <Trans i18nKey="otherResources.writeYourOwn">
                    Write your Own!
                </Trans>
                { " " }
            </Link>
            <img src={Shield} alt="shield icon"/>
        </Col>
    </Row>
    )
}

const Row = styled.div<{isMobile: boolean}>`
    display: flex;
    margin-block: 20px;
    ${({ isMobile }) => isMobile ?
        `overflow-x: scroll;
         width: 100%;`
        : 'width: 590px;'
    }
`
const Col = styled.button<{initialCol?: boolean, finalCol?: boolean}>`
    flex: 3;
    border: solid 1px ${({ theme }) => theme.loader};
    border-top: solid 2px ${({ theme }) => theme.loader};
    border-bottom: solid 2px ${({ theme }) => theme.loader};
    ${({ theme, initialCol }) =>
        initialCol ?
        'border-left: solid 2px' + theme.loader + ';'
        :
        ''
    }
    ${({ theme, finalCol }) =>
        finalCol ?
        'border-right: solid 2px' + theme.loader + ';'
        :
        ''
    }

    background: white;
    cursor: pointer;
    text-align: center;
    padding-block: 7px;
    padding-inline: 3px;

    :hover:not([disabled]) {
        z-index: 1;
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