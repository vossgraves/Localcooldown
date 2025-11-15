import { before } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import { getChannel } from "@vendetta/constants";

const MessageModule = findByProps("sendMessage");

export const settings = {
    servers: []
};

export default {
    onLoad() {
        before("sendMessage", MessageModule, (args) => {
            const channelId = args[0];
            const channel = getChannel(channelId);
            if (!channel || !channel.guild_id) return;

            const entry = settings.servers.find(s => s.guildId === channel.guild_id);
            if (!entry) return;

            const now = Date.now();
            const diff = (now - (entry.last || 0)) / 1000;

            if (diff < entry.delay) {
                const left = (entry.delay - diff).toFixed(1);
                window.toast.show(
                    `Wait ${left}s before messaging in this server.`,
                    window.toast.Types.SHORT
                );
                return false;
            }

            entry.last = now;
        });
    },

    onUnload() {},

    settings,
};
