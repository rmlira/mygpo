function(doc)
{
    function processEpisodeAction(action)
    {
        action_obj = {
                type:          "Episode",
                podcast_url:   doc.podcast_ref_url,
                episode_url:   doc.ref_url,
                podcast_id:    doc.podcast,
                episode_id:    doc.episode,
                action:        action.action,
                timestamp:     action.timestamp.slice(0, action.timestamp.length-1),
            }

        if(action.device_oldid != null)
        {
            action_obj["device_oldid"] = action.device_oldid;
        }
        if(action.started != null)
        {
            action_obj["started"] = action.started;
        }
        if(action.playmark != null)
        {
            action_obj["position"] = action.playmark;
        }
        if(action.total != null)
        {
            action_obj["total"] = action.total;
        }

        emit([doc.user_oldid, action_obj.timestamp], action_obj);
    }

    function processSubscriptionAction(action)
    {
        action_obj = {
                type:          "Subscription",
                podcast_url:   doc.ref_url,
                podcast_id:    doc.podcast,
                action:        action.action,
                timestamp:     action.timestamp.slice(0, action.timestamp.length-1),
                device_id:     action.device,
                device_oldid:  action.device_oldid,
            }

        emit([doc.user_oldid, action_obj.timestamp], action_obj);
    }


    if(doc.doc_type == "EpisodeUserState")
    {
        for(var n in doc.actions)
        {
            processEpisodeAction(doc.actions[n]);
        }
    }
    if(doc.doc_type == "PodcastUserState")
    {
        for(var n in doc.actions)
        {
            processSubscriptionAction(doc.actions[n]);
        }
    }
}
