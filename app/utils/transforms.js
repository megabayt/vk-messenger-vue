import _ from 'lodash';
import moment from 'moment';

export function chatsTransform(response) {
  const data = ((response.data && response.data.response)) || { items: [] };
  const items = _.reduce(data.items, (result, item) => {
    let profile = _.find(data.profiles, { id: item.conversation.peer.id });
    let name = '';
    if (!profile) {
      profile = _.find(data.groups, { id: item.conversation.peer.id });
    }
    if (profile) {
      if (profile.name) {
        name = profile.name; // eslint-disable-line
      } else if (profile.last_name && profile.first_name) {
        name = `${profile.first_name} ${profile.last_name}`;
      }
      return [...result, {
        id: profile.id,
        avatar: { url: profile.photo_50 },
        name,
        last_message: item.last_message,
      }];
    }
    return result;
  }, []);
  return items;
}

export function chatTransform(response, me, interlocutor) {
  const data = ((response.data && response.data.response)) || { items: [] };
  return data.items.map(item => ({
    ...item,
    _id: item.id,
    createdAt: moment(_.get(item, 'date')).toDate(),
    user: _.get(item, 'out') ? me : interlocutor,
    image: _.get(item, 'attachments[0].photo.sizes[0].url') || '',
  }));
}
