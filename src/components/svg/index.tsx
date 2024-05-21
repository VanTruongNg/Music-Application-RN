import { Path, Svg } from 'react-native-svg'
import {SVGProps} from './type'

export const LibraryIcon = (props: SVGProps) => (
    <Svg height='100%' width='100%' {...props}>
        <Path
            stroke={props.color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M7 26V6M13 6v20M19 6.043l5.336 19.913'
        />
    </Svg>
)

export const AddToPlaylistIcon = (props: SVGProps) => (
    <Svg height="100%" width="100%" {...props}>
      <Path
        fill={props.color}
        fillRule="evenodd"
        d="M17.604 36.011H14.16c-4.972 0-9.008 3.839-9.008 8.566 0 4.728 4.036 8.566 9.008 8.566 4.972 0 9.009-3.838 9.009-8.566V22.682a.286.286 0 0 0-.163-.254.32.32 0 0 0-.324.018c-1.136.735-3.96 2.559-4.829 3.112a.547.547 0 0 0-.248.454v10Zm30.336 0h-3.444c-4.972 0-9.01 3.839-9.01 8.566 0 4.728 4.038 8.566 9.01 8.566 4.971 0 9.008-3.838 9.008-8.566V7.9a.349.349 0 0 0-.096-.227.348.348 0 0 0-.248-.09H28.397c-.2 0-.362.145-.362.335v4.61c0 .09.037.181.104.245a.38.38 0 0 0 .258.1h19.2c.096 0 .181.036.239.09a.317.317 0 0 1 .104.227v22.821Zm-30.336 8.566v-3.275H14.16c-1.899 0-3.444 1.47-3.444 3.275 0 1.806 1.545 3.276 3.444 3.276s3.445-1.47 3.445-3.276Zm30.336 0v-3.275h-3.444c-1.9 0-3.445 1.47-3.445 3.275 0 1.806 1.546 3.276 3.445 3.276 1.899 0 3.444-1.47 3.444-3.276ZM13.252 7.583a.318.318 0 0 1-.219-.091.275.275 0 0 1-.095-.218v-6.08a.289.289 0 0 0-.096-.208.318.318 0 0 0-.219-.091H7.69a.342.342 0 0 0-.228.09.28.28 0 0 0-.086.21v6.08a.31.31 0 0 1-.096.217.344.344 0 0 1-.23.09H.657a.31.31 0 0 0-.219.082.275.275 0 0 0-.095.218v4.691c0 .082.028.154.095.209.057.054.133.09.22.09H7.05c.086 0 .172.028.23.091a.29.29 0 0 1 .095.21v6.079a.3.3 0 0 0 .086.218.335.335 0 0 0 .228.081h4.934a.31.31 0 0 0 .22-.081.31.31 0 0 0 .095-.218v-6.08c0-.082.028-.154.095-.209a.282.282 0 0 1 .22-.09h6.393a.363.363 0 0 0 .23-.091.28.28 0 0 0 .085-.209V7.882a.3.3 0 0 0-.085-.218.354.354 0 0 0-.23-.081h-6.394Z"
        clipRule="evenodd"
      />
    </Svg>
)

export const AddToQueueIcon = (props: SVGProps) => (
  <Svg height="100%" width="100%" {...props}>
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M53.343 48.785c0-.181-.19-.326-.381-.326H7.539c-.191 0-.287.145-.287.326v4.647c0 .18.096.326.287.326h45.423c.19 0 .381-.145.381-.327v-4.645Zm0-14.39c0-.182-.19-.328-.381-.328H7.539c-.191 0-.287.146-.287.327v4.646c0 .182.096.327.287.327h45.423c.19 0 .381-.145.381-.327v-4.646ZM25.67 19.25a.625.625 0 0 1 .381-.155h20.517c1.718 0 3.15-1.342 3.15-3.012 0-1.66-1.432-3.013-3.15-3.013H27.674c-.096 0-.191-.036-.191-.09-.096-.064-.096-.146-.096-.227V8.098c0-.082 0-.164.096-.227 0-.054.095-.09.19-.09h18.895c4.867 0 8.78 3.72 8.78 8.302 0 4.591-3.913 8.312-8.78 8.312 0 0-21.757-.01-25.67-.019-.095 0-.19-.063-.19-.154-.096-.081-.096-.181 0-.254 1.145-1.08 4.294-4.029 4.962-4.718ZM12.883 7.354c-.096 0-.191-.028-.191-.091-.096-.064-.096-.145-.096-.227V.993c0-.082-.095-.164-.095-.227a.588.588 0 0 0-.286-.09H7.348a.588.588 0 0 0-.286.09c0 .063-.096.145-.096.227v6.043c0 .082 0 .163-.095.227 0 .063-.096.09-.191.09H.286c-.095 0-.19.037-.19.1C0 7.508 0 7.59 0 7.68v4.646c0 .091 0 .173.095.227 0 .064.096.1.191.1H6.68c.095 0 .19.027.19.09.096.064.096.146.096.227v6.044c0 .081.096.163.096.227.095.063.19.09.286.09h4.867c.095 0 .19-.027.286-.09 0-.064.095-.146.095-.227V12.97c0-.082 0-.164.096-.227 0-.064.095-.091.19-.091h6.394c.096 0 .191-.036.191-.1.095-.054.095-.136.095-.227V7.68c0-.09 0-.172-.095-.227 0-.063-.095-.1-.19-.1h-6.394Z"
      clipRule="evenodd"
    />
  </Svg>
)

export const ViewAlbumIcon = (props: SVGProps) => (
  <Svg height="100%" width="100%" {...props}>
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M28.404.866C12.754.866.063 12.926.063 27.78c0 14.863 12.691 26.922 28.341 26.922s28.342-12.06 28.342-26.922C56.746 12.926 44.054.866 28.404.866Zm0 5.3c12.597 0 22.712 9.681 22.712 21.614 0 11.941-10.115 21.623-22.712 21.623-12.596 0-22.711-9.682-22.711-21.623 0-11.933 10.115-21.614 22.712-21.614Zm0 11.56c-5.82 0-10.592 4.51-10.592 10.054 0 5.553 4.771 10.063 10.592 10.063 5.821 0 10.593-4.51 10.593-10.063 0-5.545-4.772-10.054-10.593-10.054Zm0 5.29c2.768 0 5.058 2.141 5.058 4.764 0 2.631-2.29 4.773-5.058 4.773-2.767 0-5.057-2.142-5.057-4.773 0-2.623 2.29-4.764 5.057-4.764Z"
      clipRule="evenodd"
    />
  </Svg>
)

export const ViewArtistIcon = (props: SVGProps) => (
  <Svg height="100%" width="100%" {...props}>
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M16.571 27.645c-.381 1.152-1.336 1.96-2.385 2.722-1.623 1.143-3.531 2.132-5.344 3.339C4.452 36.573.349 40.448.349 48.723v2.65h34.067l-3.53-5.036-24.716-.263c.859-5.218 4.676-7.368 8.016-9.337 3.626-2.16 6.775-4.301 7.825-7.886.477-1.497 0-3.14-1.241-4.918-1.527-1.987-4.485-4.464-4.485-8.656 0-5.408 4.39-9.274 9.543-9.274h.095c5.249.036 9.543 3.884 9.543 9.274 0 4.174-2.959 6.66-4.39 8.647-1.336 1.788-1.813 3.43-1.336 4.927.382 1.389 1.145 2.568 2.1 3.603l1.717 2.023 4.294-3.42-1.813-2.024a4.002 4.002 0 0 1-.859-1.388c.096-.164.287-.49.382-.7.477-.634 1.145-1.324 1.718-2.095 1.908-2.396 3.817-5.427 3.817-9.573C41.096 6.793 34.13.758 26.019.704h-.096c-8.302 0-15.268 6.052-15.268 14.573 0 4.165 1.908 7.195 3.817 9.582.668.771 1.24 1.46 1.718 2.096.095.209.286.526.381.69Zm31.586 6.878h-2.003c-4.2 0-7.635 3.24-7.635 7.232s3.436 7.232 7.635 7.232c4.198 0 7.634-3.24 7.634-7.232 0-.173 0-.345-.096-.508.096-.173.096-.336.096-.518V23.79c0-1.462-1.24-2.65-2.768-2.65-1.527 0-2.863 1.188-2.863 2.65v10.734Zm0 5.29h-2.003c-1.146 0-2.005.871-2.005 1.942 0 1.07.86 1.942 2.005 1.942s2.003-.872 2.003-1.942c0-.173.096-.345.096-.508 0-.173-.096-.336-.096-.518v-.916Z"
      clipRule="evenodd"
    />
  </Svg>
)