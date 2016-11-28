/**
 * `exec` is *a little* faster than `replace`
 * https://jsperf.com/regex-exec-vs-replace-capture
 *
 * Lessons learnt:
 * - Precompile Regex
 * - Regex is not suitable for DOM parsing, it is also *extremely* slow.
 */

// slower alternative
 // const linksPttrn = /[^+>]*[^<]*<a [^+>]*href="(https?:\/\/[^+>^"]*)"[^+>]*>([^<]+)<\/a>/gi;
 //
 // const emailPttrn = /[^+>]*[^<]*<a [^+>]*href="mailto:(\S+@\S+\.\S+)"[^+>]*>[^<]+<\/a>/gi;

// faster regex
const linksPttrn = /<a [^+>]*href="(https?:\/\/[^+>^"]*)"[^+>]*>([^<]+)<\/a>/gi;

const emailPttrn = /<a [^+>]*href="mailto:(\S+@\S+\.\S+)"[^+>]*>[^<]+<\/a>/gi;

export function harvestLinksReplace(html) {
    const links = [];
    const emailAddresses = [];

    html.replace(linksPttrn, (...args) => {
        links.push({ linkText: args[2], url: args[1] });
    });

    html.replace(emailPttrn, (...args) => {
        emailAddresses.push(args[1]);
    });

    return {
        links,
        emailAddresses,
    };
}

export default function harvestLinksExec(html) {
    const links = [];
    const emailAddresses = [];

    let args;
    while ((args = linksPttrn.exec(html)) !== null) {
        links.push({ linkText: args[2], url: args[1] });
    }

    while ((args = emailPttrn.exec(html)) !== null) {
        emailAddresses.push(args[1]);
    }

    return {
        links,
        emailAddresses,
    };
}
