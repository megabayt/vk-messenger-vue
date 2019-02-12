import { ApiResponse } from 'apisauce';

export interface ICommonResponse< T > {
  response: T;
}

export type IChatsFetch = () => Promise< ApiResponse< IChatsResponse > >;
export type IChatsResponse = ICommonResponse< IChatsOrigResponse >;
export interface IChatsOrigResponse {
  count: number;
  items: ReadonlyArray< IMessages >;
  profiles: ReadonlyArray< IProfile >;
  groups: ReadonlyArray< IGroup >;
}
export interface IGroup {
  id: number;
  name: string;
  screen_name: string;
  is_closed: number;
  type: string;
  is_admin: number;
  is_member: number;
  is_advertiser: number;
  photo_50: string;
  photo_100: string;
  photo_200: string;
  admin_level?: number;
}
export interface IProfile {
  id: number;
  first_name: string;
  last_name: string;
  is_closed: boolean;
  can_access_closed: boolean;
  sex: number;
  screen_name: string;
  photo_50: string;
  photo_100: string;
  online: number;
  online_app?: string;
  online_mobile?: number;
}
export interface IMessages {
  conversation: IConversation;
  last_message: ILastmessage;
}
export interface ILastmessage {
  date: number;
  from_id: number;
  id: number;
  out: number;
  peer_id: number;
  text: string;
  conversation_message_id: number;
  fwd_messages: ReadonlyArray<any>;
  important: boolean;
  random_id: number;
  attachments: ReadonlyArray<IWallPostAttachment | IStickerAttachment | IPhotoAttachment>;
  is_hidden: boolean;
  keyboard?: ICurrentkeyboard;
}
export interface IPhotoAttachment {
  type: string;
  photo: IAttachmentPhoto;
}
export interface IAttachmentPhoto {
  id: number;
  album_id: number;
  owner_id: number;
  sizes: ReadonlyArray<IPhotoSize>;
  text: string;
  date: number;
  access_key: string;
}
export interface IPhotoSize {
  type: string;
  url: string;
  width: number;
  height: number;
}
export interface IStickerAttachment {
  type: string;
  sticker: ISticker;
}
export interface ISticker {
  product_id: number;
  sticker_id: number;
  images: ReadonlyArray<IImage>;
  images_with_background: ReadonlyArray<IImage>;
  animation_url: string;
}
export interface IImage {
  url: string;
  width: number;
  height: number;
}
export interface IWallPostAttachment {
  type: string;
  wall: IWallPost;
}
export interface IWallPost {
  id: number;
  from_id: number;
  to_id: number;
  date: number;
  post_type: string;
  text: string;
  marked_as_ads: number;
  attachments: ReadonlyArray<IAttachment>;
  post_source: IPostsource;
  comments: IComments;
  likes: ILikes;
  reposts: IReposts;
  views: IViews;
  is_favorite: boolean;
  access_key: string;
}
export interface IViews {
  count: number;
}
export interface IReposts {
  count: number;
  user_reposted: number;
}
export interface ILikes {
  count: number;
  user_likes: number;
  can_like: number;
  can_publish: number;
}
export interface IComments {
  count: number;
  can_post: number;
  groups_can_post: boolean;
}
export interface IPostsource {
  type: string;
}
export interface IAttachment {
  type: string;
  doc: IDoc;
}
export interface IDoc {
  id: number;
  owner_id: number;
  title: string;
  size: number;
  ext: string;
  url: string;
  date: number;
  type: number;
  preview: IPreview;
  access_key: string;
}
export interface IPreview {
  photo: IPreviewPhoto;
  video: IPreviewVideo;
}
export interface IPreviewVideo {
  src: string;
  width: number;
  height: number;
  file_size: number;
}
export interface IPreviewPhoto {
  sizes: ReadonlyArray<IPreviewPhotoSize>;
}
export interface IPreviewPhotoSize {
  src: string;
  width: number;
  height: number;
  type: string;
}
export interface IConversation {
  peer: IPeer;
  in_read: number;
  out_read: number;
  last_message_id: number;
  can_write: ICanwrite;
  current_keyboard?: ICurrentkeyboard;
  chat_settings?: IChatsettings;
}
export interface IChatsettings {
  title: string;
  members_count: number;
  state: string;
  active_ids: ReadonlyArray<number>;
  acl: IAcl;
  is_group_channel: boolean;
  owner_id: number;
}
export interface IAcl {
  can_invite: boolean;
  can_change_info: boolean;
  can_change_pin: boolean;
  can_promote_users: boolean;
  can_see_invite_link: boolean;
  can_change_invite_link: boolean;
}
export interface ICurrentkeyboard {
  one_time: boolean;
  buttons: ReadonlyArray<ReadonlyArray<IButton>>;
  author_id: number;
}
export interface IButton {
  color: string;
  action: IButtonAction;
}
export interface IButtonAction {
  type: string;
  payload: string;
  label: string;
}
export interface ICanwrite {
  allowed: boolean;
}
export interface IPeer {
  id: number;
  type: string;
  local_id: number;
}
