import { Forms } from "@vendetta/ui/components";
const { FormInput, FormText, FormRow, FormDivider } = Forms;

export default ({ settings }) => {
    const addServer = () => {
        settings.servers.push({ guildId: "", delay: 10, last: 0 });
    };

    const removeServer = (index) => {
        settings.servers.splice(index, 1);
    };

    return (
        <>
            <FormRow
                label="Add New Server Slowmode"
                trailing={<FormText style={{ color: "#00AEEF" }}>+</FormText>}
                onPress={addServer}
            />

            <FormDivider />

            {settings.servers.map((srv, i) => (
                <>
                    <FormInput
                        title="Server ID"
                        placeholder="Enter server ID"
                        value={srv.guildId}
                        onChange={v => srv.guildId = v}
                    />

                    <FormInput
                        title="Delay (seconds)"
                        placeholder="10"
                        keyboardType="numeric"
                        value={String(srv.delay)}
                        onChange={v => srv.delay = Number(v)}
                    />

                    <FormRow
                        label="Remove this entry"
                        trailing={<FormText style={{ color: "red" }}>Delete</FormText>}
                        onPress={() => removeServer(i)}
                    />

                    <FormDivider />
                </>
            ))}

            <FormText>
                You can add unlimited servers. Each server will have its own local slowmode.
            </FormText>
        </>
    );
};
